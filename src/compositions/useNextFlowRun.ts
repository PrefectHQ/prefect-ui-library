import { UseSubscription } from '@prefecthq/vue-compositions'
import merge from 'lodash.merge'
import { computed, ComputedRef, MaybeRefOrGetter, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useFlowRuns } from '@/compositions/useFlowRuns'
import { FlowRun, FlowRunsFilter, UnionFilter } from '@/models'
import { WorkspaceFlowRunsApi } from '@/services'
import { Getter } from '@/types/reactivity'

export type UseNextFlowRun = {
  subscription: UseSubscription<WorkspaceFlowRunsApi['getFlowRuns']>,
  flowRun: ComputedRef<FlowRun | undefined>,
}

export function useNextFlowRun(filter: MaybeRefOrGetter<UnionFilter | null | undefined>): UseNextFlowRun {
  const can = useCan()

  const getter: Getter<FlowRunsFilter | null> = () => {
    if (!can.read.flow_run) {
      return null
    }

    const now = new Date()
    const filterValue = toValue(filter)
    const nextFlowRunFilter: FlowRunsFilter = {
      flowRuns: {
        expectedStartTimeAfter: now,
      },
      sort: 'EXPECTED_START_TIME_ASC',
      limit: 1,
    }

    return merge({}, filterValue, nextFlowRunFilter)
  }

  const { flowRuns, subscription } = useFlowRuns(getter)
  const flowRun = computed(() => flowRuns.value.at(0))

  return {
    subscription,
    flowRun,
  }
}