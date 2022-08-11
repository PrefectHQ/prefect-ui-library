import { SchemaResponse } from '@/models/api/SchemaResponse'
import { ScheduleResponse } from '@/models/ScheduleResponse'
import { DateString } from '@/types/dates'
import { SchemaValues } from '@/types/schemas'

export type DeploymentResponse = {
  id: string,
  created: DateString,
  updated: DateString,
  name: string,
  description: string | null,
  flow_id: string,
  schedule: ScheduleResponse | null,
  is_schedule_active: boolean,
  parameters: SchemaValues,
  tags: string[] | null,
  manifest_path: string | null,
  path: string | null,
  entrypoint: string | null,
  parameter_openapi_schema: SchemaResponse,
  storage_document_id: string | null,
  infrastructure_document_id: string | null,
}
