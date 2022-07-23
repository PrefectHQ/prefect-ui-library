import { IScheduleResponse } from '@/models'

export type IDeploymentRequest = Partial<{
  name: string | null,
  schedule: IScheduleResponse | null,
  is_schedule_active: boolean,
  parameters: Record<string, unknown> | null,
  tags: string[] | null,
}>