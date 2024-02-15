import { Schedule } from '@/models/Schedule'

export type DeploymentScheduleCompat = {
  active: boolean | null,
  schedule: Schedule | null,
}
