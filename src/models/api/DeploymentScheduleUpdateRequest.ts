import { ScheduleResponse } from '@/models'
import { SchemaValuesV2 } from '@/schemas'

export type DeploymentScheduleUpdateRequest = {
  active?: boolean,
  schedule?: ScheduleResponse,
  job_variables?: Record<string, unknown>,
  parameters?: SchemaValuesV2,
}
