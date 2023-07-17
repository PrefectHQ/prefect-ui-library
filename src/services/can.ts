import { InjectionKey, ref } from 'vue'
import { MaybeRef } from '@/types/reactivity'

export const workspaceFeatureFlags = [] as const satisfies Readonly<`access:${string}`[]>

export type WorkspaceFeatureFlag = typeof workspaceFeatureFlags[number]

export const workspacePermissions = [
  'create:artifact',
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
  'create:variable',
  'create:work_queue',
  'create:work_pool_queue',
  'create:work_pool',
  'create:workspace_bot_access',
  'create:workspace_user_access',
  'delete:artifact',
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
  'delete:work_pool_queue',
  'delete:work_pool',
  'delete:workspace_bot_access',
  'delete:workspace_user_access',
  'delete:variable',
  'read:artifact',
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
  'read:variable',
  'read:work_queue',
  'read:work_pool_queue',
  'read:work_pool',
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
  'update:variable',
  'update:work_queue',
  'update:work_pool_queue',
  'update:work_pool',
  'update:workspace_bot_access',
  'update:workspace_settings',
  'update:workspace_user_access',
  'update:workspace',
] as const
export type WorkspacePermission = typeof workspacePermissions[number]

export type PermissionValue = boolean | undefined
export type PermissionVerb<T extends string> = T extends `${infer Action}:${string}` ? Action : never
export type Can<T extends string> = {
  [K in PermissionVerb<T>]:
  Extract<T, `${K}:${string}`> extends `${string}:${infer Key}`
    ? Record<Key, PermissionValue>
    : never
}
export type PermissionCheck<T> = (permission: T) => PermissionValue

export function createCan<T extends string>(permissions: MaybeRef<Readonly<T[]>>): Can<T> {
  const permissionsRef = ref(permissions)

  return new Proxy({} as Can<T>, {
    get(target, verb) {
      return new Proxy({}, {
        get(target, key) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return permissionsRef.value.includes(`${verb.toString()}:${key.toString()}` as any)
        },
      })
    },
  })
}

export const canKey: InjectionKey<Can<WorkspacePermission | WorkspaceFeatureFlag>> = Symbol('canInjectionKey')