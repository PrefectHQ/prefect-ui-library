import { DeploymentScheduleUpdateRequest } from '@/models/api/DeploymentScheduleUpdateRequest'
import { DeploymentScheduleUpdate } from '@/models/DeploymentScheduleUpdate'
import { MapFunction } from '@/services/Mapper'

export const mapDeploymentScheduleUpdateToDeploymentScheduleUpdateRequest: MapFunction<DeploymentScheduleUpdate, DeploymentScheduleUpdateRequest> = function(source) {
  const {
    active,
    schedule,
  } = source

  return {
    active,
    schedule,
  }
}