import { IScheduleResponse } from '@/models/IScheduleResponse'
import { DateString } from '@/types/dates'
import { PydanticTypeDefinition } from '@/types/Pydantic'

export type IDeploymentResponse = {
  id: string,
  created: DateString,
  updated: DateString,
  name: string,
  description: string | null,
  flow_id: string,
  schedule: IScheduleResponse | null,
  is_schedule_active: boolean,
  parameters: Record<string, unknown>,
  tags: string[] | null,
  manifest_path: string | null,
  parameter_openapi_schema: PydanticTypeDefinition,
  storage_document_id: string | null,
  infrastructure_document_id: string | null,
}
