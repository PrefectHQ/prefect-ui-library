import { Deployment, IDeployment } from '@/models'
import { Can, DeploymentObjectLevelScopes, WorkspaceFeatureFlag, WorkspacePermission } from '@/services'
import { isEmptyArray } from '@/utilities/arrays'

function isWildcardAcl(acl?: DeploymentObjectLevelScopes): boolean {
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

export class DeploymentWithObjectLevelScopes extends Deployment {
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
      // use deployment's object-level scopes from the ACL
      this.can = acl.reduce((acc, cur) => {
        acc[cur] = true
        return acc
      }, lowestPrivilegedDeploymentCan)
    }
  }
}