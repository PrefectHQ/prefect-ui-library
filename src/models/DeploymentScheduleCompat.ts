import { Schedule } from '@/models/Schedule'

export type DeploymentScheduleCompat = {
  active?: boolean,
  schedule?: Schedule,
}
