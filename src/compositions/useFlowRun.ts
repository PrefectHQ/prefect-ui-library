import { SubscriptionOptions, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, Ref, ref, watch } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceFlowRunsApi } from '@/services'
import { useFlowRunStorage } from '@/services/storage'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseFlowRun = UseEntitySubscription<WorkspaceFlowRunsApi['getFlowRun'], 'flowRun'>

export function useFlowRun(flowRunId: string | Ref<string | null | undefined>, options?: SubscriptionOptions): UseFlowRun {
  const api = useWorkspaceApi()
  const can = useCan()
  const id = ref(flowRunId)

  const parameters = computed<[string] | null>(() => {
    if (!id.value) {
      return null
    }

    if (!can.read.flow_run) {
      return null
    }

    return [id.value]
  })

  const subscription = useSubscriptionWithDependencies(api.flowRuns.getFlowRun, parameters, options)

  const storage = useFlowRunStorage()

  watch(() => subscription.response, response => {
    if (response) {
      storage.add(response)
    }
  })

  const flowRun = computed(() => {
    if (subscription.response) {
      return storage.get(subscription.response.id)
    }

    return undefined
  })

  return {
    subscription,
    flowRun,
  }
}