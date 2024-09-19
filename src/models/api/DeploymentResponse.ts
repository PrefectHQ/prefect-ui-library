import { ConcurrencyV2Response } from '@/models/api/ConcurrencyV2Response'
import { CreatedOrUpdatedByResponse } from '@/models/api/CreatedOrUpdatedByResponse'
import { DeploymentScheduleResponse } from '@/models/api/DeploymentScheduleResponse'
import { ScheduleResponse } from '@/models/api/ScheduleResponse'
import { ServerDeploymentStatus } from '@/models/DeploymentStatus'
import { SchemaResponseV2, SchemaValuesV2 } from '@/schemas'
import { DateString } from '@/types/dates'

export type DeploymentResponse = {
  id: string,
  created: DateString,
  created_by: CreatedOrUpdatedByResponse | null,
  updated: DateString,
  updated_by: CreatedOrUpdatedByResponse | null,
  name: string,
  version: string,
  description: string | null,
  flow_id: string,
  schedule: ScheduleResponse | null,
  is_schedule_active: boolean,
  paused: boolean,
  schedules: DeploymentScheduleResponse[],
  parameters: SchemaValuesV2,
  tags: string[] | null,
  manifest_path: string | null,
  path: string | null,
  entrypoint: string | null,
  parameter_openapi_schema: SchemaResponseV2 | null,
  storage_document_id: string | null,
  infrastructure_document_id: string | null,
  /** Formerly known as infra_overrides in prefect<3 */
  job_variables: Record<string, unknown> | null,
  work_queue_name: string | null,
  work_pool_name: string | null,
  enforce_parameter_schema: boolean,
  pull_steps: unknown,
  status: ServerDeploymentStatus,
  disabled?: boolean,
  concurrency_limit: number | null,
  global_concurrency_limit: ConcurrencyV2Response | null,
}
