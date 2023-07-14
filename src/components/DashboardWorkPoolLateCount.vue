<template>
  <span class="work-pool-late-count" :class="classes">
    ({{ lateFlowRunsCount }} runs)
  </span>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useInterval, useWorkspaceApi } from '@/compositions'
  import { FlowRunsFilter, WorkPool } from '@/models'

  const props = defineProps<{
    workPool: WorkPool,
    filter?: FlowRunsFilter,
  }>()

  const api = useWorkspaceApi()

  const lateFlowRunsFilter = computed<FlowRunsFilter>(() => ({
    ...props.filter,
    workPools: {
      name: [props.workPool.name],
    },
    flowRuns: {
      ...props.filter?.flowRuns,
      state: {
        name: ['Late'],
      },
    },
  }))

  const options = useInterval({ interval: 30000 })
  const lateFlowRunsCountSubscription = useSubscription(api.flowRuns.getFlowRunsCount, [lateFlowRunsFilter], options)
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