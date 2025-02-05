import type { ScheduleResponse } from '@/models/api/ScheduleResponse'
import type { SchemaValuesV2 } from '@/schemas'
import type { DateString } from '@/types/dates'


export type DeploymentScheduleResponse = {
  id: string,
  created: DateString,
  updated: DateString,
  active: boolean,
  schedule: ScheduleResponse,
  job_variables?: Record<string, unknown> | null,
  parameters?: SchemaValuesV2 | null,
}
