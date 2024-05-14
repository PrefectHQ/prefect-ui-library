import { DeploymentScheduleCreateRequest } from '@/models/api/DeploymentScheduleCreateRequest'
import { DeploymentScheduleCreate } from '@/models/DeploymentScheduleCreate'
import { MapFunction } from '@/services/Mapper'

export const mapDeploymentScheduleCreateToDeploymentScheduleCreateRequest: MapFunction<DeploymentScheduleCreate, DeploymentScheduleCreateRequest> = function(source) {
  return {
    active: source.active,
    max_active_runs: source.maxActiveRuns,
    catchup: source.catchup,
    schedule: this.map('Schedule', source.schedule, 'ScheduleRequest'),
    job_variables: source.jobVariables,
  }
}