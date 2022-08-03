import { IScheduleResponse, Parameters } from '@/models'

export type IDeploymentRequest = Partial<{
  name: string | null,
  description: string | null,
  flow_id: string | null,
  schedule: IScheduleResponse | null,
  is_schedule_active: boolean,
  parameters: Parameters | null,
  tags: string[] | null,
  storage_document_id: string | null,
  infrastructure_document_id: string | null,
}>