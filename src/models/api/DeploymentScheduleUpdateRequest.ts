import { ScheduleResponse } from '@/models'
import { SchemaValuesV2 } from '@/schemas'

export type DeploymentScheduleUpdateRequest = {
  slug?: string | null,
  active?: boolean,
  schedule?: ScheduleResponse,
  job_variables?: Record<string, unknown>,
  parameters?: SchemaValuesV2,
}
