import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, MaybeRefOrGetter, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceFlowsApi } from '@/services/WorkspaceFlowsApi'
import { Getter } from '@/types/reactivity'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseFlow = UseEntitySubscription<WorkspaceFlowsApi['getFlow'], 'flow'>

export function useFlow(flowId: MaybeRefOrGetter<string | null | undefined>): UseFlow {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[string] | null> = () => {
    if (!can.read.flow) {
      return null
    }

    const id = toValue(flowId)

    if (!id) {
      return null
    }

    return [id]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.flows.getFlow, parameters)
  const flow = computed(() => subscription.response)

  return {
    subscription,
    flow,
  }
}