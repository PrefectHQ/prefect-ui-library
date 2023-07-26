<template>
  <p-card class="workspace-dashboard-flow-runs-card">
    <header class="workspace-dashboard-flow-runs-card__header">
      <p-heading heading="5">
        Flow Runs
      </p-heading>
      <template v-if="count">
        <StatisticKeyValue label="total" :value="count" />
      </template>
    </header>
    <FlowRunsBarChart class="workspace-dashboard-flow-runs-card__chart" :filter="flowRunsFilter" />
    <FlowRunStateTypeTabs :filter="flowRunsFilter" />
  </p-card>
</template>

<script lang="ts" setup>
  import FlowRunsBarChart from '@/components/FlowRunsBarChart.vue'
  import FlowRunStateTypeTabs from '@/components/FlowRunStateTypeTabs.vue'
  import StatisticKeyValue from '@/components/StatisticKeyValue.vue'
  import { useFlowRunsCount } from '@/compositions/useFlowRunsCount'
  import { useInterval } from '@/compositions/useInterval'
  import { FlowRunsFilter } from '@/models/Filters'
  import { mapper } from '@/services/Mapper'
  import { WorkspaceDashboardFilter } from '@/types/dashboard'
  import { Getter } from '@/types/reactivity'

  const props = defineProps<{
    filter: WorkspaceDashboardFilter,
  }>()

  const options = useInterval()
  const flowRunsFilter: Getter<FlowRunsFilter> = () => mapper.map('WorkspaceDashboardFilter', props.filter, 'FlowRunsFilter')
  const { count } = useFlowRunsCount(flowRunsFilter, options)
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