import { ScheduleResponse } from '@/models/api/ScheduleResponse'
import { SchemaV2 } from '@/schemas'
import { SchemaValues } from '@/schemas/types/schemaValues'

export type DeploymentCreateRequest = {
  name: string | null,
  description: string | null,
  flow_id: string | null,
  schedules: ScheduleResponse[] | null,
  is_schedule_active?: boolean,
  parameters: SchemaValues | null,
  tags: string[] | null,
  storage_document_id: string | null,
  infrastructure_document_id: string | null,
  work_queue_name: string | null,
  work_pool_name: string | null,
  job_variables: Record<string, unknown> | null,
  enforce_parameter_schema: boolean,
  path: string | null,
  pull_steps: unknown,
  manifest_path: string | null,
  parameter_openapi_schema: unknown,
  entrypoint: string | null,
  version: string | null,
  paused: boolean,
}
