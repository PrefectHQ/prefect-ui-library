<template>
  <p-card class="workspace-dashboard-task-runs-card">
    <p-heading heading="5">
      Task Runs
    </p-heading>
    <div class="workspace-dashboard-task-runs-card__summary">
      <DashboardStatistic v-if="isDefined(total)" :value="total" primary />
      <DashboardStatistic v-if="isDefined(completed)" :value="completed" label="Completed" :meta="completedPercentage" />
      <DashboardStatistic v-if="isDefined(failed)" :value="failed" label="Failed or Crashed" :meta="failedPercentage" />
    </div>

    <!--
      <div class="workspace-dashboard-task-runs-card__chart-container">
      <LineChart :data="data" class="workspace-dashboard-task-runs-card__chart" />
      </div>
    -->
  </p-card>
</template>

<script lang="ts" setup>
  import { isDefined } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import DashboardStatistic from '@/components/DashboardStatistic.vue'
  import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
  import { TaskRunsFilter } from '@/models/Filters'
  import { mapper } from '@/services/Mapper'
  import { WorkspaceDashboardFilter } from '@/types/dashboard'

  const props = defineProps<{
    filter: WorkspaceDashboardFilter,
  }>()

  const api = useWorkspaceApi()
  const tasksFilter = computed(() => mapper.map('WorkspaceDashboardFilter', props.filter, 'TaskRunsFilter'))

  const allTasksFilter = computed<TaskRunsFilter>(() => ({
    taskRuns: {
      ...tasksFilter.value.taskRuns,
      state: {
        type: ['COMPLETED', 'FAILED', 'CRASHED'],
      },
    },
  }))
  const allTasksSubscription = useSubscription(api.taskRuns.getTaskRunsCount, [allTasksFilter])
  const total = computed(() => allTasksSubscription.response)

  const completedTasksFilter = computed<TaskRunsFilter>(() => ({
    taskRuns: {
      ...tasksFilter.value.taskRuns,
      state: {
        type: ['COMPLETED'],
      },
    },
  }))
  const completedTasksSubscription = useSubscription(api.taskRuns.getTaskRunsCount, [completedTasksFilter])
  const completed = computed(() => completedTasksSubscription.response)
  const completedPercentage = computed(() => {
    if (isDefined(completed.value) && isDefined(total.value)) {
      return toPercent(completed.value, total.value)
    }

    return undefined
  })

  const failedTasksFilter = computed<TaskRunsFilter>(() => ({
    taskRuns: {
      ...tasksFilter.value.taskRuns,
      state: {
        type: ['FAILED', 'CRASHED'],
      },
    },
  }))
  const failedTasksSubscription = useSubscription(api.taskRuns.getTaskRunsCount, [failedTasksFilter])
  const failed = computed(() => failedTasksSubscription.response)
  const failedPercentage = computed(() => {
    if (isDefined(failed.value) && isDefined(total.value)) {
      return toPercent(failed.value, total.value)
    }

    return undefined
  })

  function toPercent(x: number, y: number): string {
    const decimal = x / y
    const percent = Math.round((decimal + Number.EPSILON) * 10000) / 100

    return `${percent}%`

  }
</script>

<style>
.workspace-dashboard-task-runs-card { @apply
  relative
  grid
  gap-4
  pb-8
  overflow-hidden
}

.workspace-dashboard-task-runs-card__summary { @apply
  grid
  gap-1
}

.workspace-dashboard-task-runs-card__chart-container { @apply
  absolute
  left-0
  right-0
  bottom-0
}

.workspace-dashboard-task-runs-card__chart { @apply
  min-h-0
  h-16
}
</style>