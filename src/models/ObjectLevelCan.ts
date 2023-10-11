import { PermissionVerb, WorkspacePermission, workspacePermissions } from '@/services/can'

type PermissionVerbs = PermissionVerb<WorkspacePermission>
const permissionVerbs = workspacePermissions.map(permission => permission.split(':')[0]) as readonly PermissionVerbs[]

export type ObjectTypesWithPermissions = WorkspacePermission extends `${string}:${infer TObject}` ? TObject : never

type ActionsForObjectsHelper<O extends string, T extends string> = T extends `${infer Action}:${infer TObject}` ? TObject extends O ? Action : never : never
type PermissionsForObjectType<TObjectType extends ObjectTypesWithPermissions> = ActionsForObjectsHelper<TObjectType, WorkspacePermission>

export type ObjectLevelCan<TObjectType extends ObjectTypesWithPermissions> = {
  [key in PermissionsForObjectType<TObjectType>]: boolean
}

export function createObjectLevelCan<T extends ObjectTypesWithPermissions>(): ObjectLevelCan<T> {
  const knownProperties = permissionVerbs
  return new Proxy({} as ObjectLevelCan<T>, {
    get(_target, property) {
      // only proxy known properties so that vue doesn't think it's a ref in templates
      if (knownProperties.includes(property as PermissionVerbs)) {
        return true
      }
    },
  })
}
