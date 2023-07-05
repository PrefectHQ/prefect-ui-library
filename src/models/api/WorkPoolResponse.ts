import { SchemaResponse } from '@/models/api/SchemaResponse'
import { DateString } from '@/types/dates'

export type BaseJobTemplateResponse = {
  job_configuration?: Record<string, string>,
  variables?: SchemaResponse,
}

export type WorkPoolResponse = {
  id: string,
  created: DateString,
  updated: DateString,
  name: string,
  description: string | null,
  type: string,
  is_paused: boolean | null,
  is_push_pool?: boolean,
  concurrency_limit: number | null,
  default_queue_id: string,
  base_job_template: BaseJobTemplateResponse,
}