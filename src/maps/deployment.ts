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

type DeploymentUpdateSource = {
  request: DeploymentUpdate,
  schema: Schema,
}

export const mapDeploymentUpdateToDeploymentUpdateRequest: MapFunction<DeploymentUpdateSource, DeploymentUpdateRequest> = function({ request, schema }: DeploymentUpdateSource): DeploymentUpdateRequest {
  const { parameters, schedule, ...rest } = request
  const mapped = mapCamelToSnakeCase<DeploymentUpdateRequest>(rest)

  if (parameters) {
    mapped.parameters = this.map('SchemaValuesRequest', { values: parameters, schema }, 'SchemaValues')
  }

  if (schedule) {
    mapped.schedule = this.map('Schedule', schedule, 'ScheduleResponse')
  }

  return mapped
}

type FlowRunCreateSource = {
  request: DeploymentFlowRunCreate,
  schema: Schema,
}

export const mapDeploymentFlowRunCreateToDeploymentFlowRunRequest: MapFunction<FlowRunCreateSource, DeploymentFlowRunRequest> = function({ request, schema }: FlowRunCreateSource): DeploymentFlowRunRequest {
  const { parameters, state, ...rest } = request
  const mapped = mapCamelToSnakeCase<DeploymentFlowRunRequest>(rest)

  if (parameters) {
    mapped.parameters = this.map('SchemaValuesRequest', { values: parameters, schema }, 'SchemaValues')
  }

  if (state) {
    mapped.state = this.map('StateCreate', state, 'StateRequest')
  }

  return mapped
}

