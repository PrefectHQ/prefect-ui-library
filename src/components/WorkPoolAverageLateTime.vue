<template>
  <span v-if="lateness" class="work-pool-average-late-time">
    ({{ secondsToApproximateString(lateness) }} avg.)
  </span>
</template>

<script lang="ts" setup>
  import merge from 'lodash.merge'
  import { toRef } from 'vue'
  import { useFlowRunsAverageLateness, useInterval } from '@/compositions'
  import { FlowRunsFilter, WorkPool } from '@/models'
  import { Getter, MaybeGetter } from '@/types/reactivity'
  import { secondsToApproximateString } from '@/utilities'

  const props = defineProps<{
    workPool: WorkPool,
    filter?: MaybeGetter<FlowRunsFilter>,
  }>()

  const flowRunsFilter = toRef(props.filter)
  const options = useInterval()

  const lateFlowRunsFilter: Getter<FlowRunsFilter> = () => {
    const filter: FlowRunsFilter = {
      workPools: {
        name: [props.workPool.name],
      },
      flowRuns: {
        state: {
          name: ['Late'],
        },
      },
    }

    return merge({}, flowRunsFilter.value, filter)
  }

  const { lateness } = useFlowRunsAverageLateness(lateFlowRunsFilter, options)
</script>

<style>
.work-pool-average-late-time { @apply
  text-xs
  whitespace-nowrap
}
</style>