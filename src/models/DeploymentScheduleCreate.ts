import { Schedule } from '@/models/Schedule'

export type DeploymentScheduleCreate = {
  active: boolean,
  schedule: Schedule,
  maxActiveRuns: number | null,
  catchup: boolean | true,
  jobVariables?: Record<string, unknown>,
}
