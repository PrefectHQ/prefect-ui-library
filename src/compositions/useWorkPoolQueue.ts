import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, MaybeRefOrGetter, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceWorkQueuesApi } from '@/services/WorkspaceWorkQueuesApi'
import { Getter } from '@/types/reactivity'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseWorkPoolQueue = UseEntitySubscription<WorkspaceWorkQueuesApi['getWorkQueue'], 'workPoolQueue'>

export function useWorkPoolQueue(workPoolQueueId: MaybeRefOrGetter<string | null | undefined>): UseWorkPoolQueue {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[string] | null> = () => {
    if (!can.read.flow_run) {
      return null
    }

    const id = toValue(workPoolQueueId)

    if (!id) {
      return null
    }

    return [id]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.workQueues.getWorkQueue, parameters)
  const workPoolQueue = computed(() => subscription.response)

  return {
    subscription,
    workPoolQueue,
  }
}