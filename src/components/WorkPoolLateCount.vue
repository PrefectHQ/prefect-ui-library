<template>
  <span class="work-pool-late-count" :class="classes">
    {{ lateFlowRunsCount }}
  </span>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { FlowRunsFilter, WorkPool } from '@/models'
  import { mapper } from '@/services'
  import { WorkspaceDashboardFilter } from '@/types'

  const props = defineProps<{
    workPool: WorkPool,
    filter?: WorkspaceDashboardFilter,
  }>()

  const api = useWorkspaceApi()

  const subscriptionOptions = {
    interval: 30000,
  }

  const flowRunFilter = computed(() => mapper.map('WorkspaceDashboardFilter', props.filter, 'FlowRunFilter'))
  const lateFlowRunsFilter = computed<FlowRunsFilter>(() => ({
    workPools: {
      name: [props.workPool.name],
    },
    flowRuns: {
      ...flowRunFilter.value,
      state: {
        name: ['Late'],
      },
    },
  }))
  const lateFlowRunsCountSubscription = useSubscription(api.flowRuns.getFlowRunsCount, [lateFlowRunsFilter], subscriptionOptions)
  const lateFlowRunsCount = computed(() => lateFlowRunsCountSubscription.response ?? 0)

  const classes = computed(() => ({
    'work-pool-late-count--zero': lateFlowRunsCount.value < 1,
  }))
</script>

<style>
.work-pool-late-count--zero { @apply
  text-slate-500
}
</style>