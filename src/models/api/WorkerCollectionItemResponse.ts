import { SchemaPropertyResponse } from '@/models/api/SchemaResponse'

export type DefaultBaseJobConfigurationResponse = {
  job_configuration: Record<string, unknown>,
  variables: SchemaPropertyResponse,
}

export type WorkerCollectionItemResponse = {
  default_base_job_configuration?: DefaultBaseJobConfigurationResponse,
  description?: string,
  documentation_url?: string,
  install_command?: string,
  logo_url?: string,
  type?: string,
}

export type WorkerCollectionResponse = Record<string, WorkerCollectionItemResponse>

export type PrefectWorkerCollectionResponse = Record<string, WorkerCollectionResponse>