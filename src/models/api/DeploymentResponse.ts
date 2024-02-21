import { CreatedOrUpdatedByResponse } from '@/models/api/CreatedOrUpdatedByResponse'
import { DeploymentScheduleResponse } from '@/models/api/DeploymentScheduleResponse'
import { ScheduleResponse } from '@/models/api/ScheduleResponse'
import { SchemaResponse } from '@/models/api/SchemaResponse'
import { ServerDeploymentStatus } from '@/models/DeploymentStatus'
import { SchemaResponseV2 } from '@/schemas'
import { DateString } from '@/types/dates'
import { SchemaValues } from '@/types/schemas'


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
  parameters: SchemaValues,
  tags: string[] | null,
  manifest_path: string | null,
  path: string | null,
  entrypoint: string | null,
  parameter_openapi_schema: SchemaResponse | SchemaResponseV2 | null,
  storage_document_id: string | null,
  infrastructure_document_id: string | null,
  infra_overrides: Record<string, unknown> | null,
  work_queue_name: string | null,
  work_pool_name: string | null,
  enforce_parameter_schema: boolean,
  pull_steps: unknown,
  status: ServerDeploymentStatus,
}
