type BasicPermissions = 'create' | 'read' | 'update' | 'delete'


type ObjectLevelCan<TPermissions extends string> = {
  [key in TPermissions]: boolean
}

export type BasicPermissionsObjectLevelCan = ObjectLevelCan<BasicPermissions>
export type BasicRunnablePermissionsObjectLevelCan = ObjectLevelCan<BasicPermissions | 'run'>

export function createObjectLevelCan<T extends Record<string, boolean>>(): T {
  return new Proxy({} as T, {
    get() {
      return true
    },
  })
}
