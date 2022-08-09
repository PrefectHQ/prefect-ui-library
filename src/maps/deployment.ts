import { DeploymentFlowRunCreate, DeploymentFlowRunRequest, DeploymentUpdate, DeploymentUpdateRequest } from '@/models'
import { Deployment } from '@/models/Deployment'
import { DeploymentResponse } from '@/models/DeploymentResponse'
import { MapFunction } from '@/services/Mapper'
import { mapCamelToSnakeCase } from '@/utilities'

export const mapDeploymentResponseToDeployment: MapFunction<DeploymentResponse, Deployment> = function(source: DeploymentResponse): Deployment {
  return new Deployment({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    name: source.name,
    description: source.description,
    flowId: source.flow_id,
    schedule: this.map('ScheduleResponse', source.schedule, 'Schedule'),
    isScheduleActive: source.is_schedule_active,
    parameters: source.parameters,
    tags: source.tags,
    manifestPath: source.manifest_path,
    path: source.path,
    entrypoint: source.entrypoint,
    storageDocumentId: source.storage_document_id,
    infrastructureDocumentId: source.infrastructure_document_id,
    parameterOpenApiSchema: source.parameter_openapi_schema,
  })
}

export const mapDeploymentToDeploymentResponse: MapFunction<Deployment, DeploymentResponse> = function(source: Deployment): DeploymentResponse {
  return {
    'id': source.id,
    'created': this.map('Date', source.created, 'string'),
    'updated': this.map('Date', source.updated, 'string'),
    'name': source.name,
    'description': source.description,
    'flow_id': source.flowId,
    'schedule': this.map('Schedule', source.schedule, 'ScheduleResponse'),
    'is_schedule_active': source.isScheduleActive,
    'parameters': source.parameters,
    'tags': source.tags,
    'manifest_path': source.manifestPath,
    'path': source.path,
    'entrypoint': source.entrypoint,
    'storage_document_id': source.storageDocumentId,
    'infrastructure_document_id': source.infrastructureDocumentId,
    'parameter_openapi_schema': source.parameterOpenApiSchema,
  }
}

export const mapDeploymentUpdateToDeploymentUpdateRequest: MapFunction<DeploymentUpdate, DeploymentUpdateRequest> = function(source: DeploymentUpdate): DeploymentUpdateRequest {
  return {
    ...mapCamelToSnakeCase(source),
    'schedule': source.schedule ? this.map('Schedule', source.schedule, 'ScheduleResponse') : source.schedule,
  }
}

export const mapDeploymentFlowRunCreateToDeploymentFlowRunRequest: MapFunction<DeploymentFlowRunCreate, DeploymentFlowRunRequest> = function(source: DeploymentFlowRunCreate): DeploymentFlowRunRequest {
  return {
    ...mapCamelToSnakeCase(source),
    'state': this.map('StateCreate', source.state, 'StateRequest'),
  }
}

