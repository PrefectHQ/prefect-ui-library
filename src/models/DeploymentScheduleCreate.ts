import type { Schedule } from '@/models/Schedule'
import type { SchemaValuesV2 } from '@/schemas'

export type DeploymentScheduleCreate = {
  active: boolean,
  schedule: Schedule,
  jobVariables?: Record<string, unknown>,
  parameters?: SchemaValuesV2,
}
