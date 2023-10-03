import { MaybeRefOrGetter, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { PaginationOptions, UsePaginationEntity, usePagination } from '@/compositions/usePagination'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { Deployment, DeploymentsFilter, IDeployment } from '@/models'
import { Can, DeploymentObjectLevelScopes, WorkspaceDeploymentsApi, WorkspaceFeatureFlag, WorkspacePermission } from '@/services'
import { Getter } from '@/types/reactivity'
import { isEmptyArray } from '@/utilities/arrays'

export type UseDeployments = UsePaginationEntity<
(filter?: DeploymentsFilter) => Promise<DeploymentWithObjectLevelScopes[]>,
WorkspaceDeploymentsApi['getDeploymentsCount'],
'deployments'
>

function isWildcardAcl(acl?: DeploymentObjectLevelScopes): boolean {
  // fixme: awaiting api change
  return acl == null
}

/**
 * Return true if there is an acl but the requesting user is not on it meaning they have no access.
 */
function isRestrictedAcl(acl?: DeploymentObjectLevelScopes): boolean {
  return isEmptyArray(acl)
}

type DeploymentCan = {
  [key in DeploymentObjectLevelScopes[number]]: boolean
}

class DeploymentWithObjectLevelScopes extends Deployment {
  private readonly objectLevelScopes: DeploymentObjectLevelScopes
  public readonly can: DeploymentCan
  public constructor(deployment: IDeployment, acl: DeploymentObjectLevelScopes, can: Can<WorkspacePermission | WorkspaceFeatureFlag>) {
    super(deployment)

    this.objectLevelScopes = acl

    const lowestPrivilegedDeploymentCan = {
      manage: false,
      run: false,
      view: false,
    }

    if (isWildcardAcl(acl)) {
      // fallback to workspace scopes
      this.can = {
        manage: Boolean(can.create.deployment && can.update.deployment && can.delete.deployment),
        run: Boolean(can.run.deployment),
        view: Boolean(can.read.deployment),
      }
    } else if (isRestrictedAcl(acl)) {
      this.can = lowestPrivilegedDeploymentCan
    } else {
      this.can = acl.reduce((acc, cur) => {
        acc[cur] = true
        return acc
      }, lowestPrivilegedDeploymentCan)
    }
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