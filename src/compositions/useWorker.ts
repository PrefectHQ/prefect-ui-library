import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, MaybeRefOrGetter, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceWorkPoolWorkersApi } from '@/services'
import { Getter } from '@/types/reactivity'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseWorker = UseEntitySubscription<WorkspaceWorkPoolWorkersApi['getWorker'], 'worker'>

export function useWorker(workPoolName: MaybeRefOrGetter<string | null | undefined>, workerId: MaybeRefOrGetter<string | null | undefined>): UseWorker {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[string, string] | null> = () => {
    if (!can.read.worker) {
      return null
    }

    const name = toValue(workPoolName)
    const id = toValue(workerId)

    if (!name || !id) {
      return null
    }

    return [name, id]
  }

  const parameters = toRef(getter)

  const subscription = useSubscriptionWithDependencies(api.workPoolWorkers.getWorker, parameters)
  const worker = computed(() => subscription.response)

  return {
    subscription,
    worker,
  }
}