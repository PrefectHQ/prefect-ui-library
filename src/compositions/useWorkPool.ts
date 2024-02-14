import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, MaybeRefOrGetter, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceWorkPoolsApi } from '@/services/WorkspaceWorkPoolsApi'
import { Getter } from '@/types/reactivity'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseWorkPool = UseEntitySubscription<WorkspaceWorkPoolsApi['getWorkPoolByName'], 'workPool'>

export function useWorkPool(workPoolName: MaybeRefOrGetter<string | null | undefined>): UseWorkPool {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[string] | null> = () => {
    if (!can.read.work_pool) {
      return null
    }

    const name = toValue(workPoolName)

    if (!name) {
      return null
    }

    return [name]
  }

  const parameters = toRef(getter)

  const subscription = useSubscriptionWithDependencies(api.workPools.getWorkPoolByName, parameters)
  const workPool = computed(() => subscription.response)

  return {
    subscription,
    workPool,
  }
}