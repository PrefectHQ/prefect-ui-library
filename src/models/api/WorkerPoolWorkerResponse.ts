import { DateString } from '@/types/dates'

export type WorkerPoolWorkerResponse = {
  id: string,
  created: DateString,
  updated: DateString,
  name: string,
  worker_pool_id: string,
  last_heartbeat_time: DateString,
}