import { SchemaResponse } from '@/models/api/SchemaResponse'

export type JobConfigurationResponse = Record<string, unknown>

export type BaseJobTemplateResponse = {
  job_configuration: JobConfigurationResponse,
  variables: SchemaResponse,
}