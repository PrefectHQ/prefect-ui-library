import { DeploymentScheduleCreateRequest } from '@/models/api/DeploymentScheduleCreateRequest'
import { DeploymentScheduleCreate } from '@/models/DeploymentScheduleCreate'
import { MapFunction } from '@/services/Mapper'

export const mapDeploymentScheduleCreateToDeploymentScheduleCreateRequest: MapFunction<DeploymentScheduleCreate, DeploymentScheduleCreateRequest> = function(source) {
  return {
    active: source.active,
    max_active_runs: source.maxActiveRuns ?? null,
    catchup: source.catchup ?? null,
    schedule: this.map('Schedule', source.schedule, 'ScheduleRequest'),
    job_variables: source.jobVariables,
  }
}