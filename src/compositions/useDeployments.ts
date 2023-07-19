import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { MaybeRefOrGetter, computed, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { DeploymentsFilter } from '@/models'
import { WorkspaceDeploymentsApi } from '@/services'
import { Getter } from '@/types/reactivity'
import { UseEntitySubscription } from '@/types/useEntitySubscription'
import { isNullish } from '@/utilities'

export type UseDeployments = UseEntitySubscription<WorkspaceDeploymentsApi['getDeployments'], 'deployments'>

export function useDeployments(filter: MaybeRefOrGetter<DeploymentsFilter>): UseDeployments
export function useDeployments(deploymentIds: MaybeRefOrGetter<string[] | null | undefined>): UseDeployments
export function useDeployments(filterOrDeploymentIds?: MaybeRefOrGetter<string[] | DeploymentsFilter | null | undefined>): UseDeployments {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[DeploymentsFilter] | null> = () => {
    if (!can.read.deployment) {
      return null
    }

    const value = toValue(filterOrDeploymentIds)

    if (isNullish(value)) {
      return [{}]
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return [{}]
      }

      const filter: DeploymentsFilter = {
        deployments: {
          id: value,
        },
      }

      return [filter]
    }

    return [value]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.deployments.getDeployments, parameters)
  const deployments = computed(() => subscription.response ?? [])

  return {
    subscription,
    deployments,
  }
}