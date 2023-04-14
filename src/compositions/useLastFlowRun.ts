import { UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, ComputedRef, Ref, ref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { FlowRun, FlowRunsFilter, UnionFilter, terminalStateType } from '@/models'
import { WorkspaceFlowRunsApi } from '@/services'

export type UseLastFlowRun = {
  subscription: UseSubscription<WorkspaceFlowRunsApi['getFlowRuns']>,
  flowRun: ComputedRef<FlowRun | undefined>,
}

export function useLastFlowRun(filter: UnionFilter | Ref<UnionFilter | null | undefined>): UseLastFlowRun {
  const filterRef = ref(filter)
  const api = useWorkspaceApi()
  const can = useCan()

  const nextFilter = computed<FlowRunsFilter | null>(() => {
    if (!can.read.flow_run) {
      return null
    }

    return {
      ...filterRef.value,
      flowRuns: {
        state: {
          type: terminalStateType,
        },
      },
      limit: 1,
      sort: 'START_TIME_DESC',
    }
  })

  const subscriptionArgs = computed<[FlowRunsFilter] | null>(() => nextFilter.value ? [nextFilter.value] : null)
  const subscription = useSubscriptionWithDependencies(api.flowRuns.getFlowRuns, subscriptionArgs)
  const flowRun = computed(() => subscription.response?.[0])

  return {
    subscription,
    flowRun,
  }
}