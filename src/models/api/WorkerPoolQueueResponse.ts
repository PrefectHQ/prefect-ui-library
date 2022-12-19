import { DateString } from '@/types/dates'

export type WorkerPoolQueueResponse = {
  id: string,
  created: DateString,
  updated: DateString,
  worker_pool_id: string,
  name: string,
  description: string | null,
  is_paused: boolean | null,
  concurrency_limit: number | null,
  priority: number,
}