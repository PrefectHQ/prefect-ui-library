import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, ref } from 'vue'
import { useCan, useWorkspaceApi } from '@/compositions'
import { DeploymentsFilter } from '@/models'
import { WorkspaceDeploymentsApi } from '@/services/WorkspaceDeploymentsApi'
import { MaybeRef } from '@/types'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseDeploymentsCount = UseEntitySubscription<WorkspaceDeploymentsApi['getDeploymentsCount'], 'deploymentsCount'>

export function useDeploymentsCount(filter?: MaybeRef<DeploymentsFilter>): UseDeploymentsCount {
  const api = useWorkspaceApi()
  const filterRef = ref(filter)
  const can = useCan()

  const deploymentsCountFilter = computed<Parameters<typeof api.deployments.getDeploymentsCount> | null>(() => {
    if (!can.read.deployment) {
      return null
    }

    return [filterRef.value]
  })

  const subscription = useSubscriptionWithDependencies(api.deployments.getDeploymentsCount, deploymentsCountFilter)
  const deploymentsCount = computed(() => subscription.response)

  return {
    subscription,
    deploymentsCount,
  }
}