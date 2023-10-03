import { MaybeRefOrGetter, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { PaginationOptions, UsePaginationEntity, usePagination } from '@/compositions/usePagination'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { DeploymentsFilter } from '@/models'
import { DeploymentWithObjectLevelScopes } from '@/models/DeploymentWithObjectLevelScopes'
import { WorkspaceDeploymentsApi } from '@/services'
import { Getter } from '@/types/reactivity'

export type UseDeployments = UsePaginationEntity<
(filter?: DeploymentsFilter) => Promise<DeploymentWithObjectLevelScopes[]>,
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


  async function getDeploymentsWithObjectLevelScopes(filter: DeploymentsFilter = {}): Promise<DeploymentWithObjectLevelScopes[]> {
    const deployments = await api.deployments.getDeployments(filter)

    const deploymentIds = deployments.map(deployment => deployment.id)
    const access = await api.deployments.getDeploymentsObjectLevelScopes(deploymentIds)

    return deployments.map(deployment => new DeploymentWithObjectLevelScopes(deployment, access[deployment.id], can))
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