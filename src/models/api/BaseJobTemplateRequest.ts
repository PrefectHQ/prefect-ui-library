import { SchemaResponse } from '@/models/api/SchemaResponse'

export type JobConfigurationRequest = Record<string, unknown>

export type BaseJobTemplateRequest = {
  job_configuration?: JobConfigurationRequest,
  variables?: SchemaResponse,
}