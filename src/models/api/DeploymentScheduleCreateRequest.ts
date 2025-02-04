import { ScheduleResponse } from '@/models'
import { SchemaValuesV2 } from '@/schemas'
export type DeploymentScheduleCreateRequest = {
  active: boolean,
  schedule: ScheduleResponse,
  job_variables?: Record<string, unknown>,
  parameters?: SchemaValuesV2,
}
