import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, getCurrentInstance, onUnmounted, ref, unref, watch } from 'vue'
import { useCan, useWorkspaceApi } from '@/compositions'
import { DeploymentsFilter } from '@/models'
import { WorkspaceDeploymentsApi } from '@/services/WorkspaceDeploymentsApi'
import { MaybeRef } from '@/types'
import { UseEntitySubscription } from '@/types/useEntitySubscription'
import { isNullish } from '@/utilities'

export type UseDeploymentsCount = UseEntitySubscription<WorkspaceDeploymentsApi['getDeploymentsCount'], 'count'>

export function useDeploymentsCount(filter?: MaybeRef<DeploymentsFilter>): UseDeploymentsCount {
  const api = useWorkspaceApi()
  const filterRef = ref<[DeploymentsFilter] | null>(null)
  const can = useCan()

  const unwatch = watch([filter], ([filter]) => {
    filter = unref(filter)

    if (!can.read.deployment) {
      filterRef.value = null
      return
    }

    if (isNullish(filter)) {
      filterRef.value = [{}]
      return
    }

    filterRef.value = [filter]
  }, { immediate: true, deep: true })

  if (getCurrentInstance()) {
    onUnmounted(() => {
      subscription.unsubscribe()
      unwatch()
    })
  }

  const subscription = useSubscriptionWithDependencies(api.deployments.getDeploymentsCount, filterRef)
  const count = computed(() => subscription.response)

  return {
    subscription,
    count,
  }
}