import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, Ref, ref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceWorkPoolsApi } from '@/services/WorkspaceWorkPoolsApi'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseWorkPool = UseEntitySubscription<WorkspaceWorkPoolsApi['getWorkPoolByName'], 'workPool'>

export function useWorkPool(workPoolName: string | undefined | Ref<string | null | undefined>): UseWorkPool {
  const api = useWorkspaceApi()
  const can = useCan()
  const name = ref(workPoolName)

  const parameters = computed<[string] | null>(() => {
    if (!name.value) {
      return null
    }

    if (!can.read.work_pool) {
      return null
    }

    return [name.value]
  })

  const subscription = useSubscriptionWithDependencies(api.workPools.getWorkPoolByName, parameters)
  const workPool = computed(() => subscription.response)

  return {
    subscription,
    workPool,
  }
}