import { MaybeRefOrGetter, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { PaginationOptions, UsePaginationEntity, usePagination } from '@/compositions/usePagination'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { DeploymentsFilter } from '@/models'
import { WorkspaceDeploymentsApi } from '@/services'
import { Getter } from '@/types/reactivity'

export type UseDeployments = UsePaginationEntity<
WorkspaceDeploymentsApi['getDeployments'],
WorkspaceDeploymentsApi['getDeploymentsCount'],
'deployments'
>

export function useDeployments(filter?: MaybeRefOrGetter<DeploymentsFilter | null | undefined>, options?: PaginationOptions): UseDeployments {
  const api = useWorkspaceApi()
  const can = useCan()

  const parameters: Getter<[DeploymentsFilter?] | null> = () => {
    if (!can.read.deployment) {
      return null
    }

    const value = toValue(filter)

    if (!value) {
      return null
    }

    return [value]
  }

  const pagination = usePagination({
    fetchMethod: api.deployments.getDeployments,
    fetchParameters: parameters,
    countMethod: api.deployments.getDeploymentsCount,
    countParameters: parameters,
    options,
  })

  return {
    ...pagination,
    deployments: pagination.results,
  }
}