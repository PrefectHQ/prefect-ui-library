import { DeploymentScheduleUpdateRequest } from '@/models/api/DeploymentScheduleUpdateRequest'
import { DeploymentScheduleUpdate } from '@/models/DeploymentScheduleUpdate'
import { MapFunction } from '@/services/Mapper'

export const mapDeploymentScheduleUpdateToDeploymentScheduleUpdateRequest: MapFunction<DeploymentScheduleUpdate, DeploymentScheduleUpdateRequest> = function(source) {
  return {
    active: source.active,
    schedule: this.map('Schedule', source.schedule, 'ScheduleRequest'),
    job_variables: source.jobVariables,
  }
}