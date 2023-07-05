<template>
  <span class="dashboard-work-pool-flow-runs-total">{{ allRunsCount }}</span>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useInterval, useWorkspaceApi } from '@/compositions'
  import { WorkPool, FlowRunsFilter } from '@/models'
  import { mapper } from '@/services'
  import { WorkspaceDashboardFilter } from '@/types'

  const props = defineProps<{
    workPool: WorkPool,
    filter?: WorkspaceDashboardFilter,
  }>()

  const api = useWorkspaceApi()

  const baseFilter = computed<FlowRunsFilter>(() => ({
    workPools: {
      name: [props.workPool.name],
    },
  }))

  const flowRunsFilter = computed(() => mapper.map('WorkspaceDashboardFilter', props.filter, 'FlowRunsFilter'))

  const allRunsCountFilter = computed<FlowRunsFilter>(() => ({
    ...baseFilter.value,
    flowRuns: {
      ...flowRunsFilter.value?.flowRuns,
      state: {
        type: ['COMPLETED', 'FAILED', 'CRASHED'],
      },
    },
  }))
  const options = useInterval({ interval: 30000 })
  const allRunsCountSubscription = useSubscription(api.flowRuns.getFlowRunsCount, [allRunsCountFilter], options)
  const allRunsCount = computed(() => allRunsCountSubscription.response)
</script>
