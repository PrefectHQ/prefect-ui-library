import { createTuple } from '@/utilities'

export const { values: deploymentStatus, isValue: isDeploymentStatus } = createTuple(['ready', 'not_ready'])

export type DeploymentStatus = typeof deploymentStatus[number]
export type ServerDeploymentStatus = Uppercase<typeof deploymentStatus[number]>