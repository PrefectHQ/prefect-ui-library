import { DateString } from '@/types/dates'

export type WorkPoolQueueResponse = {
  id: string,
  created: DateString,
  updated: DateString,
  work_pool_id: string,
  name: string,
  description: string | null,
  is_paused: boolean | null,
  concurrency_limit: number | null,
  priority: number,
}