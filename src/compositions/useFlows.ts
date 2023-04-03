import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, Ref, ref, unref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceFlowsApi } from '@/services'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseFlows = UseEntitySubscription<WorkspaceFlowsApi['getFlows'], 'flows'>

export function useFlows(flowRunIds: string[] | Ref<string[] | null | undefined>): UseFlows {
  const api = useWorkspaceApi()
  const can = useCan()
  const flowRunIdsRef = ref(flowRunIds)

  const parameters = computed<Parameters<typeof api.flows.getFlows> | null>(() => {
    const ids = unref(flowRunIdsRef)

    if (!ids || ids.length === 0) {
      return null
    }

    if (!can.read.flow_run) {
      return null
    }

    return [
      {
        flows: {
          id: ids,
        },
      },
    ]
  })

  const subscription = useSubscriptionWithDependencies(api.flows.getFlows, parameters)
  const flows = computed(() => subscription.response)

  return {
    subscription,
    flows,
  }
}