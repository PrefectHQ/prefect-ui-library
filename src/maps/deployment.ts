import { DeploymentFlowRunCreate, DeploymentFlowRunRequest, DeploymentUpdate, DeploymentUpdateRequest } from '@/models'
import { DeploymentResponse } from '@/models/api/DeploymentResponse'
import { Deployment } from '@/models/Deployment'
import { MapFunction } from '@/services/Mapper'
import { mapCamelToSnakeCase } from '@/utilities'

export const mapDeploymentResponseToDeployment: MapFunction<DeploymentResponse, Deployment> = function(source: DeploymentResponse): Deployment {
  const schema = this.map('SchemaResponse', source.parameter_openapi_schema ?? {}, 'Schema')
  const values = this.map('SchemaValuesResponse', { values: source.parameters, schema }, 'SchemaValues')

  return new Deployment({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    createdBy: this.map('CreatedOrUpdatedByResponse', source.created_by, 'CreatedOrUpdatedBy'),
    updated: this.map('string', source.updated, 'Date'),
    updatedBy: this.map('CreatedOrUpdatedByResponse', source.updated_by, 'CreatedOrUpdatedBy'),
    name: source.name,
    version: source.version,
    description: source.description,
    flowId: source.flow_id,
    schedule: this.map('ScheduleResponse', source.schedule, 'Schedule'),
    isScheduleActive: source.is_schedule_active,
    parameters: values,
    tags: source.tags,
    manifestPath: source.manifest_path,
    path: source.path,
    entrypoint: source.entrypoint,
    storageDocumentId: source.storage_document_id,
    infrastructureDocumentId: source.infrastructure_document_id,
    infraOverrides: source.infra_overrides,
    parameterOpenApiSchema: schema,
    workQueueName: source.work_queue_name,
  })
}

export const mapDeploymentUpdateToDeploymentUpdateRequest: MapFunction<DeploymentUpdate, DeploymentUpdateRequest> = function(source: DeploymentUpdate): DeploymentUpdateRequest {
  const { parameters, schema, schedule, ...rest } = source
  const mapped = mapCamelToSnakeCase<DeploymentUpdateRequest>(rest)

  // type check is necessary in case data doesn't match the type exactly
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (parameters && schema) {
    mapped.parameters = this.map('SchemaValues', { values: parameters, schema }, 'SchemaValuesRequest')
  }

  mapped.schedule = this.map('Schedule', schedule, 'ScheduleRequest')

  return mapped
}

export const mapDeploymentFlowRunCreateToDeploymentFlowRunRequest: MapFunction<DeploymentFlowRunCreate, DeploymentFlowRunRequest> = function(source: DeploymentFlowRunCreate): DeploymentFlowRunRequest {
  const { parameters, state, schema, ...rest } = source
  const mapped = mapCamelToSnakeCase<DeploymentFlowRunRequest>(rest)

  if (parameters) {
    mapped.parameters = this.map('SchemaValues', { values: parameters, schema }, 'SchemaValuesRequest')
  }

  if (state) {
    mapped.state = this.map('StateCreate', state, 'StateRequest')
  }

  return mapped
}

