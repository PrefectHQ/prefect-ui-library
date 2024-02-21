import { ScheduleResponse } from '@/models'

export type DeploymentScheduleUpdateRequest = {
  active?: boolean,
  schedule?: ScheduleResponse,
}
