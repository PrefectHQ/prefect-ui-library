import { IScheduleResponse } from '@/models/IScheduleResponse'
import { Parameters } from '@/models/Parameters'
import { DateString } from '@/types/dates'
import { PydanticTypeDefinition } from '@/types/Pydantic'

export type DeploymentResponse = {
  id: string,
  created: DateString,
  updated: DateString,
  name: string,
  description: string | null,
  flow_id: string,
  schedule: IScheduleResponse | null,
  is_schedule_active: boolean,
  parameters: Parameters,
  tags: string[] | null,
  manifest_path: string | null,
  parameter_openapi_schema: PydanticTypeDefinition,
  storage_document_id: string | null,
  infrastructure_document_id: string | null,
}
