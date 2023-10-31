import { DeploymentStatus, ServerDeploymentStatus } from '@/models/DeploymentStatus'
import { MapFunction } from '@/services/Mapper'

export const mapServerDeploymentStatusToDeploymentStatus: MapFunction<ServerDeploymentStatus, DeploymentStatus> = function(source) {
  return source.toLowerCase() as DeploymentStatus
}

export const mapDeploymentStatusToServerDeploymentStatus: MapFunction<DeploymentStatus, ServerDeploymentStatus> = function(source) {
  return source.toUpperCase() as ServerDeploymentStatus
}