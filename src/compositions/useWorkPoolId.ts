import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, MaybeRefOrGetter, toRef, toValue } from 'vue'
import { WorkPoolsFilter } from '..'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceWorkPoolsApi } from '@/services/WorkspaceWorkPoolsApi'
import { Getter } from '@/types/reactivity'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseWorkPoolId = UseEntitySubscription<WorkspaceWorkPoolsApi['getWorkPools'], 'workPool'>

export function useWorkPoolId(workPoolId: MaybeRefOrGetter<string | null | undefined>): UseWorkPoolId {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[WorkPoolsFilter] | null> = () => {
    if (!can.read.work_pool) {
      return null
    }

    const id = toValue(workPoolId)

    if (!id) {
      return null
    }

    return [
      {
        workPools: {
          id: [id],
        },
      },
    ]
  }

  const parameters = toRef(getter)

  const subscription = useSubscriptionWithDependencies(api.workPools.getWorkPools, parameters)
  const workPool = computed(() => subscription.response)

  return {
    subscription,
    workPool,
  }
}