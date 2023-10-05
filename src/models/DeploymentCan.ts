import { Can, DeploymentObjectLevelScopes, WorkspaceFeatureFlag, WorkspacePermission } from '@/services'
import { isEmptyArray } from '@/utilities/arrays'

function isWildcardAcl(acl?: DeploymentObjectLevelScopes): acl is undefined {
  return acl === undefined
}

/**
 * Return true if there is an acl but the requesting user is not on it meaning they have no access.
 */
function isRestrictedAcl(acl?: DeploymentObjectLevelScopes): boolean {
  return isEmptyArray(acl)
}

export type DeploymentCan = {
  [key in DeploymentObjectLevelScopes[number]]: boolean
}

export const lowestPrivilegedDeploymentCan = Object.freeze({
  manage: false,
  run: false,
  view: false,
})

export function createDeploymentCan(acl: DeploymentObjectLevelScopes | undefined, can: Can<WorkspacePermission | WorkspaceFeatureFlag>): DeploymentCan {

  if (isWildcardAcl(acl)) {
    // fallback to workspace scopes
    return {
      manage: Boolean(can.create.deployment && can.update.deployment && can.delete.deployment),
      run: Boolean(can.run.deployment),
      view: Boolean(can.read.deployment),
    }
  } else if (isRestrictedAcl(acl)) {
    return lowestPrivilegedDeploymentCan
  }
  // use deployment's object-level scopes from the ACL
  return acl.reduce<DeploymentCan>((acc, cur) => {
    acc[cur] = true
    return acc
  }, { ...lowestPrivilegedDeploymentCan })
}
