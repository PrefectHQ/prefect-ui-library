import { InjectionKey } from 'vue'

type PermissionValue = boolean | undefined

const permissionActions = [
  'create',
  'read',
  'update',
  'delete',
] as const
export type PermissionAction = typeof permissionActions[number]

const workspacePermissionKeys = [
  'block',
  'concurrency_limit',
  'deployment',
  'flow',
  'flow_run',
  'log',
  'saved_search',
  'task_run',
  'work_queue',
  'notification_policy',
  'workspace_bot_access',
  'workspace_user_access',
] as const
export type WorkspacePermissionKey = typeof workspacePermissionKeys[number]
type WorkspacePermissions = Record<WorkspacePermissionKey, PermissionValue>

export function isWorkspacePermissionKey(key: string): key is WorkspacePermissionKey {
  return workspacePermissionKeys.includes(key as WorkspacePermissionKey)
}

function getWorkspacePermissions(check: (key: WorkspacePermissionKey) => PermissionValue): WorkspacePermissions {
  return workspacePermissionKeys.reduce<WorkspacePermissions>((reduced, key) => ({
    ...reduced,
    [key]: check(key),
  }), {} as WorkspacePermissions)
}

const accountPermissionKeys = [
  'account',
  'account_membership',
  'account_role',
  'bot',
  'invitation',
  'team',
  'team',
  'workspace',
  'workspace_role',
] as const
export type AccountPermissionKey = typeof accountPermissionKeys[number]
type AccountPermissions = Record<AccountPermissionKey, PermissionValue>

export function isAccountPermissionKey(key: string): key is AccountPermissionKey {
  return accountPermissionKeys.includes(key as AccountPermissionKey)
}

function getAccountPermissions(check: (key: AccountPermissionKey) => PermissionValue): AccountPermissions {
  return accountPermissionKeys.reduce<AccountPermissions>((reduced, key) => ({
    ...reduced,
    [key]: check(key),
  }), {} as AccountPermissions)
}

const featureFlags = [
  'billing',
  'collaboration',
  'notifications',
  'organizations',
] as const
export type FeatureFlag = typeof featureFlags[number]
type FeatureFlagPermissions = Record<FeatureFlag, PermissionValue>

export function isFeatureFlag(key: string): key is FeatureFlag {
  return featureFlags.includes(key as FeatureFlag)
}

function getFeatureFlagPermissions(check: (key: FeatureFlag) => PermissionValue): FeatureFlagPermissions {
  return featureFlags.reduce<FeatureFlagPermissions>((reduced, key) => ({
    ...reduced,
    [key]: check(key),
  }), {} as FeatureFlagPermissions)
}

export type AccountPermissionString = `${PermissionAction}:${AccountPermissionKey}`
export type WorkspacePermissionString = `${PermissionAction}:${WorkspacePermissionKey}`

export type AppPermissions = Record<PermissionAction, Record<AccountPermissionKey, PermissionValue> & Record<WorkspacePermissionKey, PermissionValue>>
export type AppFeatureFlags = Record<'access', FeatureFlagPermissions>

export function getAppPermissions(
  checkPermission: (action: PermissionAction, key: AccountPermissionKey | WorkspacePermissionKey) => PermissionValue,
  checkFeatureFlag: (key: FeatureFlag) => PermissionValue,
): Can {
  return {
    ...permissionActions.reduce<Can>((result, action) => ({
      ...result,
      [action]: {
        ...getAccountPermissions((key) => checkPermission(action, key)),
        ...getWorkspacePermissions((key) => checkPermission(action, key)),
      },
    }), {} as Can),
    access: {
      ...getFeatureFlagPermissions((key) => checkFeatureFlag(key)),
    },
  }
}

export type Can = AppPermissions & AppFeatureFlags

export const canKey: InjectionKey<Can> = Symbol()