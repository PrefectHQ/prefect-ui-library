import { InjectionKey } from 'vue'

export const workspacePermissions = [
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


export type WorkspacePermission = typeof workspacePermissions[number]
export function isWorkspacePermissionString(value: unknown): value is WorkspacePermission {
  return workspacePermissions.includes(value as WorkspacePermission)
}

export type PermissionVerb<T extends string> = T extends `${infer Action}:${string}` ? Action : never
export type Can<T extends string> = {
  [K in PermissionVerb<T>]:
  Extract<T, `${K}:${string}`> extends `${string}:${infer Key}`
    ? Record<Key, boolean>
    : never
}
export type PermissionCheck<T> = (permission: T) => boolean | undefined

export function createCan<T extends string>(permissions: Readonly<T[]>, permissionCheck: PermissionCheck<T>): Can<T> {
  return new Proxy({} as Can<T>, {
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

export const canKey: InjectionKey<Can<WorkspacePermission>> = Symbol('canInjectionKey')