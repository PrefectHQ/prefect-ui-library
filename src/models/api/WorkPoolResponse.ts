import { DateString } from '@/types/dates'

export type WorkPoolResponse = {
  id: string,
  created: DateString,
  updated: DateString,
  name: string,
  description: string | null,
  type: string,
  is_paused: boolean | null,
  concurrency_limit: number | null,
  default_queue_id: string,
}