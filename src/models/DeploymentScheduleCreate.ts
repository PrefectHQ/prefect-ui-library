import { Schedule } from '@/models/Schedule'

export type DeploymentScheduleCreate = {
  active: boolean,
  schedule: Schedule,
  maxActiveRuns: number | null,
  catchup: boolean,
  jobVariables?: Record<string, unknown>,
}
