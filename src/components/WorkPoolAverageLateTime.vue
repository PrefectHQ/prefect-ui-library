<template>
  <span v-if="averageLateness" class="work-pool-average-late-time">
    ({{ secondsToApproximateString(averageLateness) }} avg.)
  </span>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useInterval, useWorkspaceApi } from '@/compositions'
  import { FlowRunsFilter, WorkPool } from '@/models'
  import { secondsToApproximateString } from '@/utilities'

  const props = defineProps<{
    workPool: WorkPool,
    filter?: FlowRunsFilter,
  }>()

  const api = useWorkspaceApi()
  const options = useInterval()

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

  const averageLatenessSubscription = useSubscription(api.flowRuns.getFlowRunsAverageLateness, [lateFlowRunsFilter], options)
  const averageLateness = computed(() => averageLatenessSubscription.response)
</script>

<style>
.work-pool-average-late-time { @apply
  text-xs
  whitespace-nowrap
}
</style>