import { ScheduleResponse } from '@/models'

export type DeploymentScheduleCreateRequest = {
  active: boolean,
  schedule: ScheduleResponse,
}
