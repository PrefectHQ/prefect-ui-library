type BasicPermissions = 'create' | 'read' | 'update' | 'delete'


type ObjectLevelCan<TPermissions extends string> = {
  [key in TPermissions]: boolean
}

export const BasicPermissions = ['create', 'read', 'update', 'delete'] as const
export const RunnablePermissions = [...BasicPermissions, 'run'] as const

export type BasicPermissionsObjectLevelCan = ObjectLevelCan<typeof BasicPermissions[number]>
export type BasicRunnablePermissionsObjectLevelCan = ObjectLevelCan<typeof RunnablePermissions[number]>

export function createObjectLevelCan<T extends Record<string, boolean>>(knownProperties: typeof BasicPermissions | typeof RunnablePermissions): T {
  const set = new Set(knownProperties)
  return new Proxy({} as T, {
    get(___, property) {
      // only proxy known properties so that vue doesn't think it's a ref in templates
      if (set.has(property as unknown as typeof RunnablePermissions[number])) {
        return true
      }
    },
  })
}
