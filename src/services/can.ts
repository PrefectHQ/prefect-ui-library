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

export const permissions = [...accountPermissions, ...workspacePermissions] as const
export type Permissions = typeof permissions[number]

export type PermissionVerb<T extends string> = T extends `${infer Action}:${string}` ? Action : never
export type Can<T extends string> = {
  [K in PermissionVerb<T>]:
  Extract<T, `${K}:${string}`> extends `${string}:${infer Key}`
    ? Record<Key, boolean>
    : never
}
export type PermissionCheck<T> = (permission: T) => boolean | undefined

export function createCan<T extends string>(permissions: Readonly<T[]>, permissionCheck: PermissionCheck<T>): Can<T> {
  // @ts-expect-error proxy
  return new Proxy({}, {
    get(target, verb) {
      return new Proxy({}, {
        get(target, key) {
          const permissionString = `${verb.toString()}:${key.toString()}` as T
          if (permissions.includes(permissionString)) {
            return permissionCheck(permissionString)
          }

          return false
        },
      })
    },
  })
}

export const can = createCan(permissions, () => false)
export const canKey: InjectionKey<Can<Permissions>> = Symbol('canInjectionKey')