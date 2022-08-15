import { SchemaResponse } from '@/models/api/SchemaResponse'
import { Parameters } from '@/models/Parameters'
import { ScheduleResponse } from '@/models/ScheduleResponse'
import { DateString } from '@/types/dates'

export type DeploymentResponse = {
  id: string,
  created: DateString,
  updated: DateString,
  name: string,
  description: string | null,
  flow_id: string,
  schedule: ScheduleResponse | null,
  is_schedule_active: boolean,
  parameters: Parameters,
  tags: string[] | null,
  manifest_path: string | null,
  path: string | null,
  entrypoint: string | null,
  parameter_openapi_schema: SchemaResponse,
  storage_document_id: string | null,
  infrastructure_document_id: string | null,
  work_queue_name: string | null,
}
