import { IScheduleResponse, IFlowDataResponse } from '@/models'

export type IDeploymentRequest = Partial<{
  name: string | null,
  flow_id: string | null,
  flow_data: IFlowDataResponse | null,
  schedule: IScheduleResponse | null,
  is_schedule_active: boolean,
  parameters: Record<string, unknown> | null,
  tags: string[] | null,
}>