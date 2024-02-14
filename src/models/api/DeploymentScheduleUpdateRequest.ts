import { Schedule } from '@/models/Schedule'

export type DeploymentScheduleUpdateRequest = {
  active?: boolean,
  schedule?: Schedule,
}
