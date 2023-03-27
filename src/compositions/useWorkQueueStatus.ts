import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, Ref, ref } from 'vue'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceWorkQueuesApi } from '@/services/WorkspaceWorkQueuesApi'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseWorkQueueStatus = UseEntitySubscription<WorkspaceWorkQueuesApi['getWorkQueueStatus'], 'workQueueStatus'>

export function useWorkQueueStatus(workQueueId: string | Ref<string | null | undefined>): UseWorkQueueStatus {
  const api = useWorkspaceApi()
  const id = ref(workQueueId)

  const parameters = computed<[string] | null>(() => {
    if (!id.value) {
      return null
    }

    return [id.value]
  })

  const subscription = useSubscriptionWithDependencies(api.workQueues.getWorkQueueStatus, parameters)
  const workQueueStatus = computed(() => subscription.response)

  return {
    subscription,
    workQueueStatus,
  }
}