import { InjectionKey } from 'vue'

const accountPermissions = [
  'administrate:workspace',
  'create:account_role',
  'create:bot',
  'create:invitation',
  'create:team',
  'create:workspace_invitation',
  'create:workspace_role',
  'create:workspace',
  'delete:account_membership',
  'delete:account_role',
  'delete:bot',
  'delete:team',
  'delete:workspace_role',
  'read:account_membership',
  'read:account_role',
  'read:account',
  'read:billing',
  'read:bot',
  'read:invitation',
  'read:team',
  'read:workspace_invitation',
  'read:workspace_role',
  'read:workspace',
  'update:account_membership',
  'update:account_role',
  'update:account',
  'update:billing',
  'update:bot',
  'update:invitation',
  'update:team',
  'update:workspace_invitation',
  'update:workspace_role',
] as const

export type AccountPermissionString = typeof accountPermissions[number]

export function isAccountPermissionString(permissionString: PermissionString): permissionString is AccountPermissionString {
  return accountPermissions.includes(permissionString as AccountPermissionString)
}

const workspacePermissions = [
  'create:block',
  'create:concurrency_limit',
  'create:deployment',
  'create:flow_run',
  'create:flow',
  'create:log',
  'create:notification_policy',
  'create:saved_search',
  'create:task_run',
  'create:work_queue',
  'create:workspace_bot_access',
  'create:workspace_user_access',
  'delete:block',
  'delete:concurrency_limit',
  'delete:deployment',
  'delete:flow_run',
  'delete:flow',
  'delete:notification_policy',
  'delete:saved_search',
  'delete:task_run',
  'delete:work_queue',
  'delete:workspace_bot_access',
  'delete:workspace_user_access',
  'delete:workspace',
  'read:block',
  'read:concurrency_limit',
  'read:deployment',
  'read:flow_run',
  'read:flow',
  'read:log',
  'read:notification_policy',
  'read:saved_search',
  'read:task_run',
  'read:work_queue',
  'read:workspace_bot_access',
  'read:workspace_user_access',
  'update:block',
  'update:deployment',
  'update:flow_run',
  'update:flow',
  'update:notification_policy',
  'update:task_run',
  'update:work_queue',
  'update:workspace_bot_access',
  'update:workspace_user_access',
  'update:workspace',
] as const

export type WorkspacePermissionString = typeof workspacePermissions[number]

export function isWorkspacePermissionString(permissionString: PermissionString): permissionString is WorkspacePermissionString {
  return workspacePermissions.includes(permissionString as WorkspacePermissionString)
}

const featureFlags = [
  'access:billing',
  'access:collaboration',
  'access:notifications',
  'access:organizations',
  'access:run-retention',
] as const

export type FeatureFlagString = typeof featureFlags[number]

export function isFeatureFlagString(permissionString: PermissionString): permissionString is FeatureFlagString {
  return featureFlags.includes(permissionString as FeatureFlagString)
}

export type PermissionString = AccountPermissionString | WorkspacePermissionString | FeatureFlagString
export type PermissionValue = boolean | undefined
export type PermissionAction = PermissionString extends `${infer Action}:${string}` ? Action : never

type ActionKeys<
  T extends PermissionString,
  A extends PermissionAction = PermissionAction
> = T extends `${A}:${infer Entity}` ? Entity : never

export type AccountKey = ActionKeys<AccountPermissionString>
export type WorkspaceKey = ActionKeys<WorkspacePermissionString>
export type FeatureFlag = ActionKeys<FeatureFlagString>

export type Can = { [A in PermissionAction]: Record<ActionKeys<PermissionString, A>, PermissionValue> }

type PartialCan = { [K in keyof Can]?: Partial<Can[K]> }

export function getAppPermissions(
  checkPermission: (permission: PermissionString) => PermissionValue,
): Can {
  const permissions = [...accountPermissions, ...workspacePermissions, ...featureFlags]

  return permissions.reduce<PartialCan>((result, permission) => {
    const [action, key] = permission.split(':') as [PermissionAction, AccountKey | WorkspaceKey | FeatureFlag]
    const resultAction = result[action] ??= {}

    resultAction[key] = checkPermission(permission)

    return result
  }, {}) as Can
}

export const canKey: InjectionKey<Can> = Symbol()