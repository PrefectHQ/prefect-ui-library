import { Deployment } from '@/models/Deployment'
import { IDeploymentResponse } from '@/models/IDeploymentResponse'
import { MapFunction } from '@/services/Mapper'

export const mapIDeploymentResponseToDeployment: MapFunction<IDeploymentResponse, Deployment> = function(source: IDeploymentResponse): Deployment {
  return new Deployment({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    name: source.name,
    description: source.description,
    flowId: source.flow_id,
    schedule: this.map('IScheduleResponse', source.schedule, 'Schedule'),
    isScheduleActive: source.is_schedule_active,
    parameters: source.parameters,
    tags: source.tags,
    manifestPath: source.manifest_path,
    storageDocumentId: source.storage_document_id,
    infrastructureDocumentId: source.infrastructure_document_id,
    parameterOpenApiSchema: source.parameter_openapi_schema,
  })
}

export const mapDeploymentToIDeploymentResponse: MapFunction<Deployment, IDeploymentResponse> = function(source: Deployment): IDeploymentResponse {
  return {
    'id': source.id,
    'created': this.map('Date', source.created, 'string'),
    'updated': this.map('Date', source.updated, 'string'),
    'name': source.name,
    'description': source.description,
    'flow_id': source.flowId,
    'schedule': this.map('Schedule', source.schedule, 'IScheduleResponse'),
    'is_schedule_active': source.isScheduleActive,
    'parameters': source.parameters,
    'tags': source.tags,
    'manifest_path': source.manifestPath,
    'storage_document_id': source.storageDocumentId,
    'infrastructure_document_id': source.infrastructureDocumentId,
    'parameter_openapi_schema': source.parameterOpenApiSchema,
  }
}