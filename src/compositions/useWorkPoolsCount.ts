import { useSubscription } from '@prefecthq/vue-compositions'
import { computed, MaybeRefOrGetter, toRef } from 'vue'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkPoolsFilter } from '@/models'
import { WorkspaceWorkPoolsApi } from '@/services/WorkspaceWorkPoolsApi'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseWorkPoolsCount = UseEntitySubscription<WorkspaceWorkPoolsApi['getWorkPoolsCount'], 'workPoolCount'>

export function useWorkPoolsCount(filter: MaybeRefOrGetter<WorkPoolsFilter> = {}): UseWorkPoolsCount {
  const api = useWorkspaceApi()

  const filterRef = toRef(filter)

  const subscription = useSubscription(api.workPools.getWorkPoolsCount, [filterRef])
  const workPoolCount = computed(() => subscription.response)

  return {
    subscription,
    workPoolCount,
  }
}