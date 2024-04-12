import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, MaybeRefOrGetter, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceWorkPoolsApi } from '@/services/WorkspaceWorkPoolsApi'
import { Getter } from '@/types/reactivity'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseWorkPoolById = UseEntitySubscription<WorkspaceWorkPoolsApi['getWorkPoolById'], 'workPool'>

export function useWorkPoolById(workPoolId: MaybeRefOrGetter<string | null | undefined>): UseWorkPoolById {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[string] | null> = () => {
    if (!can.read.work_pool) {
      return null
    }

    const id = toValue(workPoolId)

    if (!id) {
      return null
    }

    return [id]
  }

  const parameters = toRef(getter)

  const subscription = useSubscriptionWithDependencies(api.workPools.getWorkPoolById, parameters)
  const workPool = computed(() => subscription.response)

  return {
    subscription,
    workPool,
  }
}