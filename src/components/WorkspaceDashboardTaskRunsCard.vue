<template>
  <p-card class="workspace-dashboard-task-runs-card">
    <p-heading heading="5">
      Task Runs
    </p-heading>
    <div class="workspace-dashboard-task-runs-card__summary">
      <DashboardStatistic v-if="isDefined(total)" :value="total" primary />
      <DashboardStatistic v-if="isDefined(completed)" :value="completed" label="Completed" :meta="completedPercentage" class="workspace-dashboard-task-runs-card__statistic--completed" />
      <DashboardStatistic v-if="isDefined(failed)" :value="failed" label="Failed or Crashed" :meta="failedPercentage" class="workspace-dashboard-task-runs-card__statistic--failed" />
    </div>

    <div class="workspace-dashboard-task-runs-card__chart-container">
      <LineChart :data="taskRunsChartData.failed" :options="{ maxValue: maxFailedValue }" class="workspace-dashboard-task-runs-card__chart workspace-dashboard-task-runs-card__chart--failed" />
      <LineChart :data="taskRunsChartData.completed" class="workspace-dashboard-task-runs-card__chart workspace-dashboard-task-runs-card__chart--completed" />
    </div>
  </p-card>
</template>

<script lang="ts" setup>
  import { isDefined } from '@prefecthq/prefect-design'
  import { LineChart, LineChartData } from '@prefecthq/vue-charts'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import merge from 'lodash.merge'
  import { computed } from 'vue'
  import DashboardStatistic from '@/components/DashboardStatistic.vue'
  import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
  import { TaskRunsFilter } from '@/models/Filters'
  import { mapper } from '@/services/Mapper'
  import { WorkspaceDashboardFilter } from '@/types/dashboard'
  import { toPercent } from '@/utilities'

  const props = defineProps<{
    filter: WorkspaceDashboardFilter,
  }>()

  const api = useWorkspaceApi()
  const tasksFilter = computed(() => mapper.map('WorkspaceDashboardFilter', props.filter, 'TaskRunsFilter'))

  const allTasksFilter = computed<TaskRunsFilter>(() => {
    const stateFilter: TaskRunsFilter = {
      flowRuns: {
        state: {
          type: ['COMPLETED', 'FAILED', 'CRASHED'],
        },
      },
    }

    return merge(tasksFilter.value, stateFilter)
  })
  const allTasksSubscription = useSubscription(api.taskRuns.getTaskRunsCount, [allTasksFilter])
  const total = computed(() => allTasksSubscription.response)

  const completedTasksFilter = computed<TaskRunsFilter>(() => {
    const stateFilter: TaskRunsFilter = {
      flowRuns: {
        state: {
          type: ['COMPLETED'],
        },
      },
    }

    return merge(tasksFilter.value, stateFilter)
  })
  const completedTasksSubscription = useSubscription(api.taskRuns.getTaskRunsCount, [completedTasksFilter])
  const completed = computed(() => completedTasksSubscription.response)
  const completedPercentage = computed(() => getPercent(completed.value, total.value))

  const failedTasksFilter = computed<TaskRunsFilter>(() => {
    const stateFilter: TaskRunsFilter = {
      flowRuns: {
        state: {
          type: ['FAILED', 'CRASHED'],
        },
      },
    }

    return merge(tasksFilter.value, stateFilter)
  })
  const failedTasksSubscription = useSubscription(api.taskRuns.getTaskRunsCount, [failedTasksFilter])
  const failed = computed(() => failedTasksSubscription.response)
  const failedPercentage = computed(() => getPercent(failed.value, total.value))

  const historyFilter = computed(() => mapper.map('WorkspaceDashboardFilter', props.filter, 'TaskRunsHistoryFilter'))
  const historySubscription = useSubscription(api.taskRuns.getTaskRunsHistory, [historyFilter])
  const history = computed(() => historySubscription.response ?? [])

  const taskRunsChartData = computed(() => {
    const completed: LineChartData = []
    const failed: LineChartData = []

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
    }
  })

  const maxFailedValue = computed(() => {
    const values = taskRunsChartData.value.failed.map(([, y]) => y)
    const max = Math.max(...values)

    if (max === 0) {
      return undefined
    }

    return max * 4
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
.workspace-dashboard-task-runs-card { @apply
  relative
  grid
  gap-4
  auto-rows-max
  overflow-hidden
}

.workspace-dashboard-task-runs-card__summary { @apply
  grid
  gap-1
}

.workspace-dashboard-task-runs-card__statistic--completed .dashboard-statistic__value { @apply
  text-state-completed-600
}

.workspace-dashboard-task-runs-card__statistic--failed .dashboard-statistic__value { @apply
  text-state-failed-700
}

.workspace-dashboard-task-runs-card__chart-container { @apply
  relative
  min-h-0
  h-16
}

.workspace-dashboard-task-runs-card__chart { @apply
  absolute
  min-h-0
  -left-8
  top-0
  -right-8
  bottom-0
}

.workspace-dashboard-task-runs-card__chart--completed .line-chart__path {
  stroke: theme('colors.green.500');
}

.dark .workspace-dashboard-task-runs-card__chart--completed .line-chart__gradient-stop {
  stop-color: theme('colors.green.500');
}

.workspace-dashboard-task-runs-card__chart--completed .line-chart__gradient-stop {
  stop-color: theme('colors.green.300');
}

.workspace-dashboard-task-runs-card__chart--failed .line-chart__path {
  stroke: theme('colors.red.500');
}

.dark .workspace-dashboard-task-runs-card__chart--failed .line-chart__gradient-stop {
  stop-color: theme('colors.red.500');
}

.workspace-dashboard-task-runs-card__chart--failed .line-chart__gradient-stop {
  stop-color: theme('colors.red.300');
}
</style>