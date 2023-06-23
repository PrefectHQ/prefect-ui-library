<template>
  <p-card class="workspace-dashboard-flow-runs-card">
    <header class="workspace-dashboard-flow-runs-card__header">
      <p-heading heading="5">
        Flow Runs
      </p-heading>
      <DashboardStatistic label="total" :value="flowRunsCount" />
    </header>
    <FlowRunsBarChart class="workspace-dashboard-flow-runs-card__chart" :filter="flowRunsFilter" />
    <FlowRunStateTypeTabs :filter="flowRunsFilter" />
  </p-card>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import DashboardStatistic from '@/components/DashboardStatistic.vue'
  import FlowRunsBarChart from '@/components/FlowRunsBarChart.vue'
  import FlowRunStateTypeTabs from '@/components/FlowRunStateTypeTabs.vue'
  import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
  import { mapper } from '@/services/Mapper'
  import { WorkspaceDashboardFilter } from '@/types/dashboard'

  const props = defineProps<{
    filter: WorkspaceDashboardFilter,
  }>()

  const flowRunsFilter = computed(() => mapper.map('WorkspaceDashboardFilter', props.filter, 'FlowRunsFilter'))
  const api = useWorkspaceApi()
  const flowRunsCountSubscription = useSubscription(api.flowRuns.getFlowRunsCount, [flowRunsFilter])
  const flowRunsCount = computed(() => flowRunsCountSubscription.response ?? 0)
</script>

<style>
.workspace-dashboard-flow-runs-card { @apply
  grid
  grid-cols-1
  auto-rows-max
  gap-4
}

.workspace-dashboard-flow-runs-card__header { @apply
  flex
  items-center
  justify-between
}

.workspace-dashboard-flow-runs-card__chart { @apply
  h-24
}
</style>