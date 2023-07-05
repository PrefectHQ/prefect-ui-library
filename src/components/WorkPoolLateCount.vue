<template>
  <span class="work-pool-late-count" :class="classes">
    {{ lateFlowRunsCount }}
    <template v-if="averageLateness">
      {{ averageLateness }}
    </template>
  </span>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { FlowRunsFilter, WorkPool } from '@/models'

  const props = defineProps<{
    workPool: WorkPool,
    filter?: FlowRunsFilter,
  }>()

  const api = useWorkspaceApi()

  const subscriptionOptions = {
    interval: 30000,
  }

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
  const lateFlowRunsCountSubscription = useSubscription(api.flowRuns.getFlowRunsCount, [lateFlowRunsFilter], subscriptionOptions)
  const lateFlowRunsCount = computed(() => lateFlowRunsCountSubscription.response ?? 0)

  const averageLatenessSubscription = useSubscription(api.flowRuns.getFlowRunsAverageLateness, [lateFlowRunsFilter], subscriptionOptions)
  const averageLateness = computed(() => averageLatenessSubscription.response ?? null)

  const classes = computed(() => ({
    'work-pool-late-count--zero': lateFlowRunsCount.value < 1,
  }))
</script>

<style>
.work-pool-late-count--zero { @apply
  text-slate-500
}
</style>