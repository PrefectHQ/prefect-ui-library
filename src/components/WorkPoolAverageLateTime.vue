<template>
  <span v-if="lateness" class="work-pool-average-late-time">
    ({{ secondsToApproximateString(lateness) }} avg.)
  </span>
</template>

<script lang="ts" setup>
  import merge from 'lodash.merge'
  import { toValue } from 'vue'
  import { useFlowRunsAverageLateness, useInterval } from '@/compositions'
  import { FlowRunsFilter, WorkPool } from '@/models'
  import { Getter, MaybeGetter } from '@/types/reactivity'
  import { secondsToApproximateString } from '@/utilities'

  const props = defineProps<{
    workPool: WorkPool,
    filter?: MaybeGetter<FlowRunsFilter>,
  }>()

  const options = useInterval()

  const flowRunsFilter: Getter<FlowRunsFilter> = () => {
    const base = toValue(props.filter)
    const filter: FlowRunsFilter = {
      workPools: {
        id: [props.workPool.id],
      },
    }

    return merge({}, base, filter)
  }

  const { lateness } = useFlowRunsAverageLateness(flowRunsFilter, options)
</script>

<style>
.work-pool-average-late-time { @apply
  text-xs
  whitespace-nowrap
}
</style>