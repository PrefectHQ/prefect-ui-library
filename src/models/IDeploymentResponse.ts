import { IFlowDataResponse } from '@/models/IFlowDataResponse'
import { IScheduleResponse } from '@/models/IScheduleResponse'
import { DateString } from '@/types/dates'

export type IDeploymentResponse = {
  id: string,
  created: DateString,
  updated: DateString,
  name: string,
  flow_id: string,
  flow_data: IFlowDataResponse,
  schedule: IScheduleResponse | null,
  is_schedule_active: boolean,
  parameters: Record<string, unknown>,
  tags: string[] | null,
}
