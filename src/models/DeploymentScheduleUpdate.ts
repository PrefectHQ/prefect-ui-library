import { Schedule } from '@/models/Schedule'

export type DeploymentScheduleUpdate = {
  active?: boolean,
  schedule?: Schedule,
}
