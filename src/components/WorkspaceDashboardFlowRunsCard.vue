<template>
  <p-card class="workspace-dashboard-flow-runs-card">
    <header class="workspace-dashboard-flow-runs-card__header">
      <p-heading heading="5">
        Flow Runs
      </p-heading>
      <template v-if="count">
        <ValueKeyStatistic label="total" :value="count" />
      </template>
    </header>
    <FlowRunsBarChart class="workspace-dashboard-flow-runs-card__chart" :filter="flowRunsFilter" />
    <FlowRunStateTypeTabs :filter="flowRunsFilter" />
  </p-card>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import ValueKeyStatistic from '@/components/ValueKeyStatistic.vue'
  import FlowRunsBarChart from '@/components/FlowRunsBarChart.vue'
  import FlowRunStateTypeTabs from '@/components/FlowRunStateTypeTabs.vue'
  import { useFlowRunsCount } from '@/compositions/useFlowRunsCount'
  import { useInterval } from '@/compositions/useInterval'
  import { mapper } from '@/services/Mapper'
  import { WorkspaceDashboardFilter } from '@/types/dashboard'

  const props = defineProps<{
    filter: WorkspaceDashboardFilter,
  }>()

  const options = useInterval()
  const flowRunsFilter = computed(() => mapper.map('WorkspaceDashboardFilter', props.filter, 'FlowRunsFilter'))
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