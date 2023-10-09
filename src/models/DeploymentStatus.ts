export const deploymentStatus = ['ready', 'not_ready'] as const

export type DeploymentStatus = typeof deploymentStatus[number]
export type ServerDeploymentStatus = Uppercase<typeof deploymentStatus[number]>