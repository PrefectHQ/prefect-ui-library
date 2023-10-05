type DeploymentObjectLevelPermissions = 'create' | 'read' | 'update' | 'delete' | 'run'

export type DeploymentCan = {
  [key in DeploymentObjectLevelPermissions[number]]: boolean
}

export function createDeploymentCan(): DeploymentCan {
  return new Proxy({} as DeploymentCan, {
    get() {
      return true
    },
  })
}
