import { MaybeRefOrGetter, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { PaginationOptions, UsePaginationEntity, usePagination } from '@/compositions/usePagination'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { Deployment, DeploymentsFilter, createDeploymentCan } from '@/models'
import { WorkspaceDeploymentsApi } from '@/services'
import { Getter } from '@/types/reactivity'

export type UseDeployments = UsePaginationEntity<
(filter?: DeploymentsFilter) => Promise<Deployment[]>,
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


  async function getDeploymentsWithObjectLevelScopes(filter: DeploymentsFilter = {}): Promise<Deployment[]> {
    const deployments = await api.deployments.getDeployments(filter)

    const deploymentIds = deployments.map(deployment => deployment.id)
    const access = await api.deployments.getDeploymentsObjectLevelScopes(deploymentIds)

    deployments.forEach(deployment => {
      deployment.can = createDeploymentCan(access[deployment.id], can)
    })
    return deployments
  }

  const pagination = usePagination({
    fetchMethod: getDeploymentsWithObjectLevelScopes,
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