import { Schedule } from '@/models/Schedule'

export type DeploymentScheduleCreate = {
  active: boolean,
  schedule: Schedule,
}
