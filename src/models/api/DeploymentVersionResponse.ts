import { CreatedOrUpdatedByResponse } from '@/index'
import { SchemaResponseV2, SchemaValuesV2 } from '@/schemas'
import { DateString } from '@/types/dates'

export type DeploymentVersionInfoResponse = {
  type: string,
  base: string | null,
  branch: string | null,
  version: string,
  url: string | null,
} & Record<string, unknown>

export type DeploymentVersionResponse = {
  id: string,
  created: DateString,
  created_by: CreatedOrUpdatedByResponse | null,
  updated: DateString,
  updated_by: CreatedOrUpdatedByResponse | null,
  name: string,
  deployment_id: string,
  description: string | null,
  version_info: DeploymentVersionInfoResponse,
  parameters: SchemaValuesV2,
  tags: string[] | null,
  labels: Record<string, string>,
  entrypoint: string | null,
  parameter_openapi_schema: SchemaResponseV2 | null,
  job_variables: Record<string, unknown> | null,
  work_queue_name: string | null,
  work_pool_name: string | null,
  enforce_parameter_schema: boolean,
  pull_steps: unknown,
}

export type DeploymentVersionPaginationResponse = {
  results: DeploymentVersionResponse[],
  count: number,
  limit: number,
  pages: number,
  page: number,
}