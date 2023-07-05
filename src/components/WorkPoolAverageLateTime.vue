<template>
  <span class="work-pool-average-late-time" :class="classes">
    <template v-if="averageLateness">
      {{ secondsToApproximateString(averageLateness) }}
    </template>
    <template v-else>
      N/A
    </template>
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

  const classes = computed(() => ({
    'work-pool-average-late-time--zero': !averageLateness.value,
  }))
</script>

<style>
.work-pool-average-late-time--zero { @apply
  text-slate-500
}
</style>