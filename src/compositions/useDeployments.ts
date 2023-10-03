import { MaybeRefOrGetter, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { PaginationOptions, UsePaginationEntity, usePagination } from '@/compositions/usePagination'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { DeploymentsFilter, IDeployment } from '@/models'
import { Can, WorkspaceDeploymentsApi, WorkspaceFeatureFlag, WorkspacePermission } from '@/services'
import { Getter } from '@/types/reactivity'

export type UseDeployments = UsePaginationEntity<
typeof fetch,
WorkspaceDeploymentsApi['getDeploymentsCount'],
'deployments'
>

class AclDeployment extends Deployment {
  public constructor(deployment: IDeployment, acl: any, can: Can<WorkspacePermission | WorkspaceFeatureFlag>) {
    super(deployment)

    // acl logic
    // and scope stuff?

  }

  public canRun(): boolean {
    return true
  }
}

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


  async function fetch(filter: DeploymentsFilter = {}): Promise<AclDeployment[]> {
    const deployments = await api.deployments.getDeployments(filter)
    const deploymentIds = deployments.map(deployment => deployment.id)
    const access = await api.deployments.getDeploymentsAccess(deploymentIds)


  }

  const pagination = usePagination({
    fetchMethod: fetch,
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