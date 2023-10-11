type ObjectLevelCan<TPermissions extends string> = {
  [key in TPermissions]: boolean
}

export const BasicObjectLevelPermissions = ['create', 'read', 'update', 'delete'] as const
export const RunnableObjectLevelPermissions = [...BasicObjectLevelPermissions, 'run'] as const

export type BasicPermissionsObjectLevelCan = ObjectLevelCan<typeof BasicObjectLevelPermissions[number]>
export type BasicRunnablePermissionsObjectLevelCan = ObjectLevelCan<typeof RunnableObjectLevelPermissions[number]>

export function createObjectLevelCan<T extends Record<string, boolean>>(knownProperties: typeof BasicObjectLevelPermissions | typeof RunnableObjectLevelPermissions): T {
  const set = new Set(knownProperties)
  return new Proxy({} as T, {
    get(___, property) {
      // only proxy known properties so that vue doesn't think it's a ref in templates
      if (set.has(property as unknown as typeof RunnableObjectLevelPermissions[number])) {
        return true
      }
    },
  })
}
