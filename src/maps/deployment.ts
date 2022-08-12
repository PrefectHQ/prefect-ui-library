import { DeploymentFlowRunCreate, DeploymentFlowRunRequest, DeploymentUpdate, DeploymentUpdateRequest } from '@/models'
import { Deployment } from '@/models/Deployment'
import { DeploymentResponse } from '@/models/DeploymentResponse'
import { MapFunction } from '@/services/Mapper'
import { Schema } from '@/types/schemas'
import { mapCamelToSnakeCase } from '@/utilities'

export const mapDeploymentResponseToDeployment: MapFunction<DeploymentResponse, Deployment> = function(source: DeploymentResponse): Deployment {
  const schema = this.map('SchemaResponse', source.parameter_openapi_schema, 'Schema')

  return new Deployment({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    name: source.name,
    description: source.description,
    flowId: source.flow_id,
    schedule: this.map('ScheduleResponse', source.schedule, 'Schedule'),
    isScheduleActive: source.is_schedule_active,
    parameters: this.map('SchemaValuesResponse', { values: source.parameters, schema }, 'SchemaValues'),
    tags: source.tags,
    manifestPath: source.manifest_path,
    path: source.path,
    entrypoint: source.entrypoint,
    storageDocumentId: source.storage_document_id,
    infrastructureDocumentId: source.infrastructure_document_id,
    parameterOpenApiSchema: schema,
  })
}

export const mapDeploymentUpdateToDeploymentUpdateRequest: MapFunction<DeploymentUpdate, DeploymentUpdateRequest> = function(source: DeploymentUpdate): DeploymentUpdateRequest {
  const { parameters, schema, schedule, ...rest } = source
  const mapped = mapCamelToSnakeCase<DeploymentUpdateRequest>(rest)

  if (parameters && schema) {
    mapped.parameters = this.map('SchemaValuesRequest', { values: parameters, schema }, 'SchemaValues')
  }

  if (schedule) {
    mapped.schedule = this.map('Schedule', schedule, 'ScheduleResponse')
  }

  return mapped
}

export const mapDeploymentFlowRunCreateToDeploymentFlowRunRequest: MapFunction<DeploymentFlowRunCreate, DeploymentFlowRunRequest> = function(source: DeploymentFlowRunCreate): DeploymentFlowRunRequest {
  const { parameters, state, schema, ...rest } = source
  const mapped = mapCamelToSnakeCase<DeploymentFlowRunRequest>(rest)

  if (parameters) {
    mapped.parameters = this.map('SchemaValuesRequest', { values: parameters, schema }, 'SchemaValues')
  }

  if (state) {
    mapped.state = this.map('StateCreate', state, 'StateRequest')
  }

  return mapped
}

