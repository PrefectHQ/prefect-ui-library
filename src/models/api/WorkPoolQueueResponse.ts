import { DateString } from '@/types/dates'

export type WorkPoolQueueResponseStatus = 'READY' | 'PAUSED' | 'NOT_READY'

export type WorkPoolQueueResponse = {
  id: string,
  created: DateString,
  updated: DateString,
  work_pool_id: string,
  work_pool_name?: string,
  name: string,
  description: string | null,
  is_paused: boolean | null,
  concurrency_limit: number | null,
  priority: number,
  status?: WorkPoolQueueResponseStatus | null,
}