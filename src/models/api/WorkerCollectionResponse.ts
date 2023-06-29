import { BaseJobTemplateResponse } from '@/models/api/BaseJobTemplateResponse'

export type WorkerCollectionWorkerApiResponse = {
  type?: string,
  default_base_job_configuration?: BaseJobTemplateResponse,
  description?: string,
  display_name?: string,
  documentation_url?: string,
  install_command?: string,
  logo_url?: string,
  is_beta?: boolean,
}

export type WorkerCollectionWorkerResponse = WorkerCollectionWorkerApiResponse & {
  type: string,
  default_base_job_configuration: BaseJobTemplateResponse,
}

export type WorkerCollectionResponse = Record<string, Record<string, WorkerCollectionWorkerApiResponse>>