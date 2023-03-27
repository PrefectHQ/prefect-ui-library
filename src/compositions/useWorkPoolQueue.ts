import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, Ref, ref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceWorkQueuesApi } from '@/services/WorkspaceWorkQueuesApi'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseWorkPoolQueue = UseEntitySubscription<WorkspaceWorkQueuesApi['getWorkQueue'], 'workPoolQueue'>

export function useWorkPoolQueue(workPoolQueueId: string | Ref<string | null | undefined>): UseWorkPoolQueue {
  const api = useWorkspaceApi()
  const can = useCan()
  const id = ref(workPoolQueueId)

  const parameters = computed<[string] | null>(() => {
    if (!id.value) {
      return null
    }

    if (!can.read.flow_run) {
      return null
    }

    return [id.value]
  })

  const subscription = useSubscriptionWithDependencies(api.workQueues.getWorkQueue, parameters)
  const workPoolQueue = computed(() => subscription.response)

  return {
    subscription,
    workPoolQueue,
  }
}