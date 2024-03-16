import { Schedule } from '@/models/Schedule'

export type DeploymentScheduleCompatible = {
  active: boolean | null,
  schedule: Schedule | null,
  jobVariables: Record<string, unknown> | undefined,
}
