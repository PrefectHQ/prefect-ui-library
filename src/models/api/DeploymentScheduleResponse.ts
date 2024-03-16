import { ScheduleResponse } from '@/models/api/ScheduleResponse'
import { DateString } from '@/types/dates'


export type DeploymentScheduleResponse = {
  id: string,
  created: DateString,
  updated: DateString,
  active: boolean,
  schedule: ScheduleResponse,
  job_variables?: Record<string, unknown> | null,
}
