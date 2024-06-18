import { UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import merge from 'lodash.merge'
import { ComputedRef, MaybeRefOrGetter, computed, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { PaginationOptions } from '@/compositions/usePagination'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { Deployment, DeploymentsPaginationFilter } from '@/models'
import { WorkspaceDeploymentsApi } from '@/services'
import { Getter } from '@/types/reactivity'

type UseDeployments = {
  subscription: UseSubscription<WorkspaceDeploymentsApi['getDeploymentsPaginated']>,
  deployments: ComputedRef<Deployment[]>,
  count: ComputedRef<number>,
  limit: ComputedRef<number>,
  pages: ComputedRef<number>,
  page: ComputedRef<number>,
}
export function useDeployments(filter?: MaybeRefOrGetter<DeploymentsPaginationFilter | null | undefined>, options?: PaginationOptions): UseDeployments {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[DeploymentsPaginationFilter?] | null> = () => {
    if (!can.read.deployment) {
      return null
    }

    const value = toValue(filter)

    if (!value) {
      return null
    }

    // merge here is important to track changes to `filter` if it is a reactive
    return [merge({}, value)]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.deployments.getDeploymentsPaginated, parameters, options)

  const deployments = computed(() => subscription.response?.results ?? [])
  const pages = computed(() => subscription.response?.pages ?? 0)
  const limit = computed(() => subscription.response?.limit ?? 0)
  const count = computed(() => subscription.response?.count ?? 0)
  const page = computed(() => subscription.response?.page ?? 1)

  return {
    subscription,
    deployments,
    pages,
    page,
    limit,
    count,
  }
}