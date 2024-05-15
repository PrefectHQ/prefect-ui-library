import { MaybeReadonly } from '@prefecthq/prefect-design'
import { UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { ComputedRef, MaybeRefOrGetter, computed, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { FlowRun, FlowRunsFilter } from '@/models'
import { WorkspaceFlowRunsApi } from '@/services'
import { Getter } from '@/types/reactivity'

export type UseFlowRuns = {
  subscription: UseSubscription<WorkspaceFlowRunsApi['getFlowRuns']>,
  flowRuns: ComputedRef<FlowRun[]>,
}

export function useFlowRuns(filter?: MaybeRefOrGetter<MaybeReadonly<FlowRunsFilter> | null | undefined>): UseFlowRuns {
  const api = useWorkspaceApi()
  const can = useCan()

  const parameters: Getter<[FlowRunsFilter] | null> = () => {
    if (!can.read.flow_run) {
      return null
    }

    const value = toValue(filter)

    if (!value) {
      return null
    }

    return [value]
  }

  const parametersRef = toRef(parameters)
  const subscription = useSubscriptionWithDependencies(api.flowRuns.getFlowRuns, parametersRef)
  const flowRuns = computed(() => subscription.response ?? [])

  return {
    subscription,
    flowRuns,
  }
}