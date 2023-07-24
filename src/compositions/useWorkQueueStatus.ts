import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, MaybeRefOrGetter, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceWorkQueuesApi } from '@/services/WorkspaceWorkQueuesApi'
import { Getter } from '@/types/reactivity'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseWorkQueueStatus = UseEntitySubscription<WorkspaceWorkQueuesApi['getWorkQueueStatus'], 'workQueueStatus'>

export function useWorkQueueStatus(workQueueId: MaybeRefOrGetter<string | null | undefined>): UseWorkQueueStatus {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[string] | null> = () => {
    if (!can.read.work_queue) {
      return null
    }

    const id = toValue(workQueueId)

    if (!id) {
      return null
    }

    return [id]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.workQueues.getWorkQueueStatus, parameters)
  const workQueueStatus = computed(() => subscription.response)

  return {
    subscription,
    workQueueStatus,
  }
}