import { Schedule } from '@/models/Schedule'

export type DeploymentScheduleUpdate = {
  active?: boolean,
  schedule?: Schedule,
  maxActiveRuns?: number | null,
  catchup?: boolean | true,
  jobVariables?: Record<string, unknown>,
}
