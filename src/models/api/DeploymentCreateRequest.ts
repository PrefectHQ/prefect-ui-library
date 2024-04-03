import { ScheduleResponse } from '@/models'
import { SchemaResponse } from '@/models/api/SchemaResponse'
import { SchemaResponseV2 } from '@/schemas'
import { SchemaValues } from '@/types/schemas'

export type DeploymentCreateRequest = Partial<{
  name: string | null,
  description: string | null,
  flow_id: string | null,
  schedule: ScheduleResponse | null,
  is_schedule_active: boolean,
  parameters: SchemaValues | null,
  tags: string[] | null,
  storage_document_id: string | null,
  infrastructure_document_id: string | null,
  work_queue_name: string | null,
  work_pool_name: string | null,
  infra_overrides: Record<string, unknown> | null,
  enforce_parameter_schema: boolean,
  manifest_path: string | null,
  path: string | null,
  entrypoint: string | null,
  parameter_openapi_schema: SchemaResponse | SchemaResponseV2 | null,
  pull_steps: unknown,
}>

