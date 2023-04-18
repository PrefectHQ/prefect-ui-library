import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { Ref, computed, ref, unref } from 'vue'
import { isNullish } from '..'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { DeploymentsFilter } from '@/models'
import { WorkspaceDeploymentsApi } from '@/services'
import { MaybeRef } from '@/types'
import { UseEntitySubscription } from '@/types/useEntitySubscription'


export type UseDeployments = UseEntitySubscription<WorkspaceDeploymentsApi['getDeployments'], 'deployments'>

export function useDeployments(filter: MaybeRef<DeploymentsFilter>): UseDeployments
export function useDeployments(deploymentIds: MaybeRef<string[] | null | undefined>): UseDeployments
export function useDeployments(filter?: MaybeRef<string[] | DeploymentsFilter | null | undefined>): UseDeployments {
  const unrefFilter = unref(filter)
  let filterRef: Ref<string[] | DeploymentsFilter | null | undefined>
  if (Array.isArray(unrefFilter)) {
    filterRef = ref(filter ?? [])
  }

  if (typeof unrefFilter === 'object') {
    filterRef = ref(filter ?? {})
  }

  const api = useWorkspaceApi()
  const can = useCan()

  const deploymentsFilter = computed<[DeploymentsFilter] | null>(() => {
    if (!can.read.deployment) {
      return null
    }

    if (isNullish(filterRef.value)) {
      return [{}]
    }

    if (Array.isArray(filterRef.value)) {
      if (filterRef.value.length === 0) {
        return [{}]
      }

      return [
        {
          deployments: {
            id: filterRef.value,
          },
        },
      ]
    }

    return [filterRef.value]
  })


  const subscription = useSubscriptionWithDependencies(api.deployments.getDeployments, deploymentsFilter)
  const deployments = computed(() => subscription.response ?? [])

  return {
    subscription,
    deployments,
  }
}