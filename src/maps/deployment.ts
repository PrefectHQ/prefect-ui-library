import { DeploymentFlowRunCreate, DeploymentFlowRunRequest, DeploymentUpdate, DeploymentUpdateRequest } from '@/models'
import { Deployment } from '@/models/Deployment'
import { DeploymentResponse } from '@/models/DeploymentResponse'
import { MapFunction } from '@/services/Mapper'
import { mapCamelToSnakeCase } from '@/utilities'

export const mapDeploymentResponseToDeployment: MapFunction<DeploymentResponse, Deployment> = function(source: DeploymentResponse): Deployment {
  const schema = this.map('SchemaResponse', source.parameter_openapi_schema, 'Schema')
  const values = this.map('SchemaValuesResponse', { values: source.parameters, schema }, 'SchemaValues')

  return new Deployment({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    createdBy: this.map('CreatedByResponse', source.created_by, 'CreatedBy'),
    updated: this.map('string', source.updated, 'Date'),
    updatedBy: this.map('CreatedByResponse', source.updated_by, 'CreatedBy'),
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
    parameterOpenApiSchema: schema,
    workQueueName: source.work_queue_name,
  })
}

export const mapDeploymentToDeploymentResponse: MapFunction<Deployment, DeploymentResponse> = function(source: Deployment): DeploymentResponse {
  return {
    'id': source.id,
    'name': source.name,
    'version': source.version,
    'description': source.description,
    'flow_id': source.flowId,
    'is_schedule_active': source.isScheduleActive,
    'parameters': source.parameters,
    'tags': source.tags,
    'manifest_path': source.manifestPath,
    'path': source.path,
    'entrypoint': source.entrypoint,
    'storage_document_id': source.storageDocumentId,
    'infrastructure_document_id': source.infrastructureDocumentId,
    'parameter_openapi_schema': source.parameterOpenApiSchema,
    'created': this.map('Date', source.created, 'string'),
    'created_by': this.map('CreatedBy', source.createdBy, 'CreatedByResponse'),
    'updated': this.map('Date', source.updated, 'string'),
    'updated_by': this.map('CreatedBy', source.updatedBy, 'CreatedByResponse'),
    'schedule': this.map('Schedule', source.schedule, 'ScheduleResponse'),
    'work_queue_name': source.workQueueName,
  }
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

