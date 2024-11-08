import { ServerWorkPoolWorkerStatus } from '@/models/WorkPoolWorkerStatus'
import { DateString } from '@/types/dates'


export type WorkPoolWorkerResponse = {
  id: string,
  created: DateString,
  updated: DateString,
  name: string,
  work_pool_id: string,
  last_heartbeat_time: DateString,
  status: ServerWorkPoolWorkerStatus,
  client_version?: string | null,
  heartbeat_interval_seconds: number,
  metadata_: Record<string, unknown> | null,
}

export type WorkPoolWorkerPaginationResponse = {
  results: WorkPoolWorkerResponse[],
  count: number,
  limit: number,
  page: number,
  pages: number,
}
