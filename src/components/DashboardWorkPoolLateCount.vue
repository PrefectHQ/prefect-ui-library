<template>
  <span class="work-pool-late-count" :class="classes">
    {{ lateFlowRunsCount }}
  </span>
</template>

<script lang="ts" setup>
  import merge from 'lodash.merge'
  import { computed, toValue } from 'vue'
  import { useFlowRunsCount, useInterval } from '@/compositions'
  import { FlowRunsFilter, WorkPool } from '@/models'
  import { Getter, MaybeGetter } from '@/types/reactivity'

  const props = defineProps<{
    workPool: WorkPool,
    filter?: MaybeGetter<FlowRunsFilter>,
  }>()

  const lateFlowRunsFilter: Getter<FlowRunsFilter> = () => {
    const base = toValue(props.filter)
    const filter: FlowRunsFilter = {
      workPools: {
        name: [props.workPool.name],
      },
      flowRuns: {
        state: {
          name: ['late'],
        },
      },
    }

    return merge({}, base, filter)
  }

  const options = useInterval({ interval: 30000 })
  const { count } = useFlowRunsCount(lateFlowRunsFilter, options)
  const lateFlowRunsCount = computed(() => count.value ?? 0)

  const classes = computed(() => ({
    'work-pool-late-count--zero': lateFlowRunsCount.value < 1,
  }))
</script>

<style>
.work-pool-late-count--zero { @apply
  text-slate-500
}
</style>