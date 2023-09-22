import { ScheduleResponse } from '@/models'
import { SchemaValues } from '@/types/schemas'

export type DeploymentUpdateRequest = Partial<{
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
}>