import { UseSubscription } from '@prefecthq/vue-compositions'
import { computed, ComputedRef, Ref, ref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useFlowRuns } from '@/compositions/useFlowRuns'
import { FlowRun, FlowRunsFilter, UnionFilter } from '@/models'
import { WorkspaceFlowRunsApi } from '@/services'

export type UseNextFlowRun = {
  subscription: UseSubscription<WorkspaceFlowRunsApi['getFlowRuns']>,
  flowRun: ComputedRef<FlowRun | undefined>,
}

export function useNextFlowRun(filter: UnionFilter | Ref<UnionFilter | null | undefined>): UseNextFlowRun {
  const filterRef = ref(filter)
  const can = useCan()

  const nextFilter = computed<FlowRunsFilter | null>(() => {
    if (!can.read.flow_run) {
      return null
    }

    const now = new Date()

    return {
      ...filterRef.value,
      flowRuns: {
        ...filterRef.value?.flowRuns,
        expectedStartTimeAfter: now,
      },
      limit: 1,
      sort: 'EXPECTED_START_TIME_ASC',
    }
  })

  const { flowRuns, subscription } = useFlowRuns(nextFilter)

  const flowRun = computed(() => flowRuns.value.at(0))

  return {
    subscription,
    flowRun,
  }
}