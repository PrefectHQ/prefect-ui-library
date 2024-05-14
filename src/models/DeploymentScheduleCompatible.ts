import { Schedule } from '@/models/Schedule'

export type DeploymentScheduleCompatible = {
  active: boolean | null,
  schedule: Schedule | null,
  maxActiveRuns: number | null,
  catchup: boolean,
  jobVariables: Record<string, unknown> | undefined,
}
