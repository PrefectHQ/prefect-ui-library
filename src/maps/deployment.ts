import { Deployment } from '@/models/Deployment'
import { DeploymentResponse } from '@/models/DeploymentResponse'
import { MapFunction } from '@/services/Mapper'

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
    'storage_document_id': source.storageDocumentId,
    'infrastructure_document_id': source.infrastructureDocumentId,
    'parameter_openapi_schema': source.parameterOpenApiSchema,
  }
}