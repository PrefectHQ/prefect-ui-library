import { Parameters } from '@/models/Parameters'
import { ScheduleResponse } from '@/models/ScheduleResponse'
import { DateString } from '@/types/dates'
import { PydanticTypeDefinition } from '@/types/Pydantic'

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
  parameter_openapi_schema: PydanticTypeDefinition,
  storage_document_id: string | null,
  infrastructure_document_id: string | null,
}
