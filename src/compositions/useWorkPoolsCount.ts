import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, MaybeRefOrGetter, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkPoolsFilter } from '@/models'
import { WorkspaceWorkPoolsApi } from '@/services/WorkspaceWorkPoolsApi'
import { Getter } from '@/types/reactivity'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseWorkPoolsCount = UseEntitySubscription<WorkspaceWorkPoolsApi['getWorkPoolsCount'], 'workPoolCount'>

export function useWorkPoolsCount(filter: MaybeRefOrGetter<WorkPoolsFilter> = {}): UseWorkPoolsCount {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[WorkPoolsFilter] | null> = () => {
    if (!can.read.work_pool) {
      return null
    }

    const filterValue = toValue(filter)

    return [filterValue]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.workPools.getWorkPoolsCount, parameters)
  const workPoolCount = computed(() => subscription.response)

  return {
    subscription,
    workPoolCount,
  }
}
