import { SchemaResponse } from '@/models/api/SchemaResponse'

export type BaseJobTemplateRequest = {
  job_configuration?: Record<string, string>,
  variables?: SchemaResponse,
}

export type WorkPoolCreateRequest = Partial<{
  name: string,
  description: string,
  type: string,
  is_paused: boolean,
  concurrency_limit: number,
  base_job_template: BaseJobTemplateRequest,
}>

export type WorkPoolEditRequest = Partial<{
  description: string | null,
  is_paused: boolean,
  concurrency_limit: number | null,
  base_job_template: BaseJobTemplateRequest,
}>