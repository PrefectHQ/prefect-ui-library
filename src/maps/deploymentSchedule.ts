import { DeploymentSchedule } from '@/models/DeploymentSchedule'
import { DeploymentScheduleResponse } from '@/models/api/DeploymentScheduleResponse'
import { MapFunction } from '@/services/Mapper'

export const mapDeploymentScheduleResponseToDeploymentSchedule: MapFunction<DeploymentScheduleResponse, DeploymentSchedule> = function(source) {
  return new DeploymentSchedule({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    slug: source.slug ?? null,
    active: source.active,
    schedule: this.map('ScheduleResponse', source.schedule, 'Schedule'),
    jobVariables: source.job_variables ?? {},
    parameters: source.parameters ?? {},
  })
}
