import { ScheduleResponse } from '@/models'

export type DeploymentScheduleCreateRequest = {
  active: boolean,
  schedule: ScheduleResponse,
  job_variables?: Record<string, unknown>,
}
