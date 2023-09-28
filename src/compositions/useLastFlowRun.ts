import merge from 'lodash.merge'
import { computed, ComputedRef, MaybeRefOrGetter, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { UseFlowRuns, useFlowRuns } from '@/compositions/useFlowRuns'
import { FlowRun, FlowRunsFilter, UnionFilter } from '@/models'

export type UseLastFlowRun = Pick<UseFlowRuns, 'subscriptions'> & {
  flowRun: ComputedRef<FlowRun | undefined>,
}

export function useLastFlowRun(filter: MaybeRefOrGetter<UnionFilter | null | undefined>): UseLastFlowRun {
  const can = useCan()

  const getter = (): FlowRunsFilter | null => {
    if (!can.read.flow_run) {
      return null
    }

    const now = new Date()
    const filterValue = toValue(filter)
    const latestFilter: FlowRunsFilter = {
      flowRuns: {
        expectedStartTimeBefore: now,
      },
      sort: 'EXPECTED_START_TIME_DESC',
      limit: 1,
    }

    return merge({}, filterValue, latestFilter)
  }

  const { flowRuns, subscriptions } = useFlowRuns(getter)
  const flowRun = computed(() => flowRuns.value.at(0))

  return {
    subscriptions,
    flowRun,
  }
}