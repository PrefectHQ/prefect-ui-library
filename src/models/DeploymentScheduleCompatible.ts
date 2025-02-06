import type { Schedule } from '@/models/Schedule'
import type { SchemaValuesV2 } from '@/schemas'

export type DeploymentScheduleCompatible = {
  active: boolean | null,
  schedule: Schedule | null,
  jobVariables: Record<string, unknown> | undefined,
  parameters?: SchemaValuesV2,
  slug?: string | null,
}
