import { InjectionKey } from 'vue'

const accountPermissions = [
  'administrate:sso',
  'administrate:workspace',
  'create:account_role',
  'create:audit_event',
  'create:bot',
  'create:invitation',
  'create:team',
  'create:workspace_invitation',
  'create:workspace_role',
  'create:workspace_role',
  'create:workspace',
  'delete:account',
  'delete:account_membership',
  'delete:account_role',
  'delete:bot',
  'delete:team',
  'delete:workspace_role',
  'delete:workspace_role',
  'read:account_membership',
  'read:account_role',
  'read:account',
  'read:audit_event',
  'read:billing',
  'read:bot',
  'read:invitation',
  'read:sso',
  'read:team',
  'read:workspace_invitation',
  'read:workspace_role',
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
  'update:workspace_role',
] as const

export type AccountPermissionString = typeof accountPermissions[number]

export function isAccountPermissionString(permissionString: PermissionString): permissionString is AccountPermissionString {
  return accountPermissions.includes(permissionString as AccountPermissionString)
}

const workspacePermissions = [
  'create:automation',
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
  'create:worker_pool_queue',
  'create:worker_pool',
  'create:workspace_bot_access',
  'create:workspace_user_access',
  'delete:automation',
  'delete:block',
  'delete:concurrency_limit',
  'delete:deployment',
  'delete:flow_run',
  'delete:flow',
  'delete:notification_policy',
  'delete:saved_search',
  'delete:task_run',
  'delete:work_queue',
  'delete:worker_pool_queue',
  'delete:worker_pool',
  'delete:workspace_bot_access',
  'delete:workspace_user_access',
  'delete:workspace',
  'read:automation',
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
  'read:worker_pool_queue',
  'read:worker_pool',
  'read:workspace_bot_access',
  'read:workspace_settings',
  'read:workspace_user_access',
  'run:deployment',
  'update:automation',
  'update:block',
  'update:deployment',
  'update:flow_run',
  'update:flow',
  'update:notification_policy',
  'update:task_run',
  'update:work_queue',
  'update:worker_pool_queue',
  'update:worker_pool',
  'update:workspace_bot_access',
  'update:workspace_settings',
  'update:workspace_user_access',
  'update:workspace',
] as const

export type WorkspacePermissionString = typeof workspacePermissions[number]

export function isWorkspacePermissionString(permissionString: PermissionString): permissionString is WorkspacePermissionString {
  return workspacePermissions.includes(permissionString as WorkspacePermissionString)
}

const featureFlags = [
  'access:automation',
  'access:chameleon',
  'access:transfer',
  'access:flow-run-graph',
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
export type PermissionKey = AccountKey | WorkspaceKey | FeatureFlag

export type Can = { [A in PermissionAction]: Record<ActionKeys<PermissionString, A>, PermissionValue> }

type PartialCan = { [K in keyof Can]?: Partial<Can[K]> }

export function getAppPermissions(
  checkPermission: (permission: PermissionString) => PermissionValue,
): Can {
  const permissions = [...accountPermissions, ...workspacePermissions, ...featureFlags]

  return permissions.reduce<PartialCan>((result, permission) => {
    const [action, key] = permissionStringToPermissionTuple(permission)
    const resultAction = result[action] ??= {}

    resultAction[key] = checkPermission(permission)

    return result
  }, {}) as Can
}

type PermissionTuple<S extends PermissionString> = S extends `${infer Action}:${infer Key}`
  ? [Action, Key]
  : never

export function permissionStringToPermissionTuple<S extends PermissionString>(permission: S): PermissionTuple<S> {
  const [action, key] = permission.split(':')

  return [action, key] as PermissionTuple<S>
}

export const canKey: InjectionKey<Can> = Symbol('canInjectionKey')