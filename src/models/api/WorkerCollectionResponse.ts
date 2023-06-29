import { BaseJobTemplateResponse } from '@/models/api/BaseJobTemplateResponse'

export type WorkerCollectionWorkerResponse = {
  default_base_job_configuration?: BaseJobTemplateResponse,
  description?: string,
  display_name?: string,
  documentation_url?: string,
  install_command?: string,
  logo_url?: string,
  type?: string,
  is_beta?: boolean,
}

export type WorkerCollectionResponse = Record<string, Record<string, WorkerCollectionWorkerResponse>>