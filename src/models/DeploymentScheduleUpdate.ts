import { Schedule } from '@/models/Schedule'
import { SchemaValuesV2 } from '@/schemas'

export type DeploymentScheduleUpdate = {
  slug?: string | null,
  active?: boolean,
  schedule?: Schedule,
  jobVariables?: Record<string, unknown>,
  parameters?: SchemaValuesV2,
}
