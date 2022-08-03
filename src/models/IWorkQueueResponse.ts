import { WorkQueueFilterResponse } from '@/models/WorkQueueFilterResponse'
import { DateString } from '@/types/dates'

export type IWorkQueueResponse = {
  id: string,
  created: DateString,
  updated: DateString,
  name: string,
  filter: WorkQueueFilterResponse,
  description: string | null,
  is_paused: boolean | null,
  concurrency_limit: number | null,
}