import { WorkQueueFilterResponse } from '@/models/api/WorkQueueFilterResponse'
import { DateString } from '@/types/dates'

export type WorkQueueResponse = {
  id: string,
  created: DateString,
  updated: DateString,
  name: string,
  filter?: WorkQueueFilterResponse,
  description: string | null,
  is_paused: boolean | null,
  concurrency_limit: number | null,
  priority: number,
  work_pool_id: string,
  work_pool_name?: string,
  status?: 'READY' | 'PAUSED' | 'NOT_READY' | null,
}