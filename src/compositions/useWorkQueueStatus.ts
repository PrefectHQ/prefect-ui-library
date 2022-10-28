import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, ComputedRef, Ref, ref } from 'vue'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkQueueStatus } from '@/models/WorkQueueStatus'

export function useWorkQueueStatus(workQueueId: string | Ref<string | null | undefined>): ComputedRef<WorkQueueStatus | undefined> {
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

  return workQueueStatus
}