<template>
  <p-card class="cumulative-task-runs-card">
    <p-heading heading="5">
      Task Runs
    </p-heading>
    <div class="cumulative-task-runs-card__summary">
      <StatisticKeyValue v-if="isDefined(total)" :value="total" primary />
      <StatisticKeyValue v-if="isDefined(running) && running > 0" :value="running" label="Running" class="cumulative-task-runs-card__statistic--running" />
      <StatisticKeyValue v-if="isDefined(completed)" :value="completed" label="Completed" :meta="completedPercentage" class="cumulative-task-runs-card__statistic--completed" />
      <StatisticKeyValue v-if="isDefined(failed) && failed > 0" :value="failed" label="Failed" :meta="failedPercentage" class="cumulative-task-runs-card__statistic--failed" />
    </div>

    <div class="cumulative-task-runs-card__chart-container">
      <LineChart v-if="isDefined(failed) && failed > 0" :data="taskRunsChartData.failed" :options="{ maxValue: maxFailedValue }" class="cumulative-task-runs-card__chart cumulative-task-runs-card__chart--failed" />
      <LineChart :data="taskRunsChartData.completed" :options="{ maxValue: maxCompletedValue }" class="cumulative-task-runs-card__chart cumulative-task-runs-card__chart--completed" />
    </div>
  </p-card>
</template>

<script lang="ts" setup>
  import { isDefined } from '@prefecthq/prefect-design'
  import { LineChart, LineChartData } from '@prefecthq/vue-charts'
  import merge from 'lodash.merge'
  import { computed, toRef } from 'vue'
  import StatisticKeyValue from '@/components/StatisticKeyValue.vue'
  import { useInterval } from '@/compositions/useInterval'
  import { useTaskRunsCount } from '@/compositions/useTaskRunsCount'
  import { useTaskRunsHistory } from '@/compositions/useTaskRunsHistory'
  import { TaskRunsFilter } from '@/models/Filters'
  import { mapper } from '@/services/Mapper'
  import { Getter, MaybeGetter } from '@/types/reactivity'
  import { toPercent } from '@/utilities'

  const props = defineProps<{
    filter: MaybeGetter<TaskRunsFilter>,
  }>()

  const options = useInterval()
  const filter = toRef(props.filter)

  const allTasksFilter: Getter<TaskRunsFilter> = () => {
    const stateFilter: TaskRunsFilter = {
      taskRuns: {
        state: {
          type: ['COMPLETED', 'FAILED', 'CRASHED', 'RUNNING'],
        },
      },
    }

    return merge({}, filter.value, stateFilter)
  }
  const { count: total } = useTaskRunsCount(allTasksFilter, options)

  const percentComparisonTotal = computed(() => {
    let comparisonTotal = total.value ?? 0

    if (running.value) {
      comparisonTotal = comparisonTotal - running.value
    }

    return comparisonTotal
  })

  const completedTasksFilter: Getter<TaskRunsFilter> = () => {
    const stateFilter: TaskRunsFilter = {
      taskRuns: {
        state: {
          type: ['COMPLETED'],
        },
      },
    }

    return merge({}, filter.value, stateFilter)
  }
  const { count: completed } = useTaskRunsCount(completedTasksFilter, options)
  const completedPercentage = computed(() => getPercent(completed.value, percentComparisonTotal.value))

  const failedTasksFilter: Getter<TaskRunsFilter> = () => {
    const stateFilter: TaskRunsFilter = {
      taskRuns: {
        state: {
          type: ['FAILED', 'CRASHED'],
        },
      },
    }

    return merge({}, filter.value, stateFilter)
  }
  const { count: failed } = useTaskRunsCount(failedTasksFilter, options)
  const failedPercentage = computed(() => getPercent(failed.value, percentComparisonTotal.value))

  const runningTasksFilter: Getter<TaskRunsFilter> = () => {
    const stateFilter: TaskRunsFilter = {
      taskRuns: {
        state: {
          type: ['RUNNING'],
        },
      },
    }

    return merge({}, filter.value, stateFilter)
  }
  const { count: running } = useTaskRunsCount(runningTasksFilter, options)

  const { history } = useTaskRunsHistory(() => mapper.map('TaskRunsFilter', filter.value, 'TaskRunsHistoryFilter'), options)

  const taskRunsChartData = computed(() => {
    const completed: LineChartData = []
    const failed: LineChartData = []
    const running: LineChartData = []

    history.value.forEach(item => {
      let completedCount = 0
      let failedCount = 0

      item.states.forEach(state => {
        if (state.stateType === 'COMPLETED') {
          completedCount += state.countRuns
        } else if (['FAILED', 'CRASHED'].includes(state.stateType)) {
          failedCount += state.countRuns
        }
      })

      const [, completedBase = 0] = completed.at(-1) ?? []
      const [, failedBase = 0] = failed.at(-1) ?? []

      completed.push([item.intervalStart, completedBase + completedCount])
      failed.push([item.intervalStart, failedBase + failedCount])
    })

    return {
      completed,
      failed,
      running,
    }
  })

  const maxValue = computed(() => {
    const completedValues = taskRunsChartData.value.completed.map(([, y]) => y)
    const failedValues = taskRunsChartData.value.failed.map(([, y]) => y)
    const minValue = 1
    const max = Math.max(...completedValues, ...failedValues, minValue)

    return max
  })

  const MAX_ITERATIONS = 10

  const maxCompletedValue = computed(() => {
    const completedValues = taskRunsChartData.value.completed.map(([, y]) => y)
    const minValue = 1
    const maxCompleted = Math.max(...completedValues, minValue)

    if (maxCompleted === maxValue.value) {
      return maxCompleted
    }

    let unit = 1

    while (unit <= MAX_ITERATIONS) {
      if (maxCompleted > maxValue.value / unit) {
        return maxCompleted * unit
      }

      unit++
    }

    return maxCompleted * unit
  })

  const maxFailedValue = computed(() => {
    const failedValues = taskRunsChartData.value.failed.map(([, y]) => y)
    const minValue = 1
    const maxFailed = Math.max(...failedValues, minValue)

    if (maxFailed === maxValue.value) {
      return maxFailed
    }

    let unit = 1

    while (unit <= MAX_ITERATIONS) {
      if (maxFailed > maxValue.value / unit) {
        return maxFailed * unit
      }

      unit++
    }

    return maxFailed * unit
  })

  function getPercent(x: number | undefined, y: number | undefined): string | undefined {
    if (isDefined(x) && isDefined(y)) {
      const percent = toPercent(x, y)

      if (percent) {
        return `${percent}%`
      }
    }

    return undefined
  }
</script>

<style>
.cumulative-task-runs-card { @apply
  relative
  grid
  gap-4
  auto-rows-max
  overflow-hidden
  pb-20
}

.cumulative-task-runs-card__summary { @apply
  grid
  gap-1
}

.cumulative-task-runs-card__statistic--completed .dashboard-statistic__value { @apply
  text-state-completed-600
}

.cumulative-task-runs-card__statistic--failed .dashboard-statistic__value { @apply
  text-state-failed-700
}

.cumulative-task-runs-card__statistic--running .dashboard-statistic__value { @apply
  text-state-running-500
  dark:text-state-running-400
}

.cumulative-task-runs-card__chart-container { @apply
  absolute
  min-h-0
  h-16
  left-0
  right-0
  bottom-4
}

.cumulative-task-runs-card__chart { @apply
  absolute
  min-h-0
  left-0
  top-0
  right-0
  bottom-0
}

.cumulative-task-runs-card__chart--completed .line-chart__path {
  stroke: theme('colors.green.500');
}

.dark .cumulative-task-runs-card__chart--completed .line-chart__gradient-stop {
  stop-color: theme('colors.green.500');
}

.cumulative-task-runs-card__chart--completed .line-chart__gradient-stop {
  stop-color: theme('colors.green.300');
}

.cumulative-task-runs-card__chart--failed .line-chart__path {
  stroke: theme('colors.red.500');
}

.dark .cumulative-task-runs-card__chart--failed .line-chart__gradient-stop {
  stop-color: theme('colors.red.500');
}

.cumulative-task-runs-card__chart--failed .line-chart__gradient-stop {
  stop-color: theme('colors.red.300');
}
</style>