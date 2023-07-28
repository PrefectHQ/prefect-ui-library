<template>
  <StatisticKeyValue class="dashboard-work-pool-flow-runs-total" label="total" :value="count ?? 0" />
</template>

<script lang="ts" setup>
  import merge from 'lodash.merge'
  import { toValue } from 'vue'
  import StatisticKeyValue from '@/components/StatisticKeyValue.vue'
  import { useFlowRunsCount, useInterval } from '@/compositions'
  import { WorkPool, FlowRunsFilter } from '@/models'
  import { Getter, MaybeGetter } from '@/types/reactivity'

  const props = defineProps<{
    workPool: WorkPool,
    filter?: MaybeGetter<FlowRunsFilter>,
  }>()

  const allRunsCountFilter: Getter<FlowRunsFilter> = () => {
    const base = toValue(props.filter)
    const filter: FlowRunsFilter = {
      workPools: {
        name: [props.workPool.name],
      },
      flowRuns: {
        state: {
          type: ['COMPLETED', 'FAILED', 'CRASHED'],
        },
      },
    }

    return merge({}, base, filter)
  }
  const options = useInterval()
  const { count } = useFlowRunsCount(allRunsCountFilter, options)
</script>
