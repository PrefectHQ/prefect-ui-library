import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, onUnmounted, Ref, ref, unref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceFlowRunsApi } from '@/services'
import { flowRunStorage } from '@/services/storage'
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
  const flowRunsResponse = computed(() => subscription.response)

  flowRunStorage.addAll(flowRunsResponse)

  const { value: flowRuns, unsubscribe } = flowRunStorage.subscribeAll(flowRunIds)

  onUnmounted(() => unsubscribe())

  return {
    subscription,
    flowRuns,
  }
}