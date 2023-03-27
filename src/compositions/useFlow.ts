import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, Ref, ref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceFlowsApi } from '@/services/WorkspaceFlowsApi'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseFlow = UseEntitySubscription<WorkspaceFlowsApi['getFlow'], 'flow'>

export function useFlow(flowId: string | Ref<string | null | undefined>): UseFlow {
  const api = useWorkspaceApi()
  const can = useCan()
  const id = ref(flowId)

  const parameters = computed<[string] | null>(() => {
    if (!id.value) {
      return null
    }

    if (!can.read.flow) {
      return null
    }

    return [id.value]
  })

  const subscription = useSubscriptionWithDependencies(api.flows.getFlow, parameters)
  const flow = computed(() => subscription.response)

  return {
    subscription,
    flow,
  }
}