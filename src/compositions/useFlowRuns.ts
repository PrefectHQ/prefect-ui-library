import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, Ref, ref, unref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceFlowRunsApi } from '@/services'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseFlowRuns = UseEntitySubscription<WorkspaceFlowRunsApi['getFlowRuns'], 'flowRuns'>

export function useFlowRuns(flowRunIds: string[] | Ref<string[] | null | undefined>): UseFlowRuns {
  const api = useWorkspaceApi()
  const can = useCan()
  const flowRunIdsRef = ref(flowRunIds)

  const parameters = computed<Parameters<typeof api.flowRuns.getFlowRuns> | null>(() => {
    const ids = unref(flowRunIdsRef)

    if (!ids || ids.length === 0) {
      return null
    }

    if (!can.read.flow_run) {
      return null
    }

    return [
      {
        flowRuns: {
          id: ids,
        },
      },
    ]
  })

  const subscription = useSubscriptionWithDependencies(api.flowRuns.getFlowRuns, parameters)
  const flowRuns = computed(() => subscription.response)

  return {
    subscription,
    flowRuns,
  }
}