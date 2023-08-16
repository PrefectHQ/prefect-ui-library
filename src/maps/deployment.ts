import { sortStringArray } from '@prefecthq/prefect-design'
import { DeploymentFlowRunCreate, DeploymentFlowRunRequest, DeploymentUpdate, DeploymentUpdateRequest } from '@/models'
import { DeploymentResponse } from '@/models/api/DeploymentResponse'
import { Deployment } from '@/models/Deployment'
import { MapFunction } from '@/services/Mapper'

export const mapDeploymentResponseToDeployment: MapFunction<DeploymentResponse, Deployment> = function(source) {
  const rawSchema = source.parameter_openapi_schema ?? {}
  const schema = this.map('SchemaResponse', rawSchema, 'Schema')
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
    rawParameters: source.parameters,
    rawSchema,
    tags: source.tags ? sortStringArray(source.tags) : null,
    manifestPath: source.manifest_path,
    path: source.path,
    entrypoint: source.entrypoint,
    storageDocumentId: source.storage_document_id,
    infrastructureDocumentId: source.infrastructure_document_id,
    infrastructureOverrides: source.infra_overrides,
    parameterOpenApiSchema: schema,
    workQueueName: source.work_queue_name,
    workPoolName: source.work_pool_name,
  })
}

export const mapDeploymentUpdateToDeploymentUpdateRequest: MapFunction<DeploymentUpdate, DeploymentUpdateRequest> = function(source) {
  return {
    description: source.description,
    schedule: this.map('Schedule', source.schedule, 'ScheduleRequest'),
    is_schedule_active: source.isScheduleActive,
    parameters: source.parameters ? this.map('SchemaValues', { values: source.parameters, schema: source.schema }, 'SchemaValuesRequest') : undefined,
    tags: source.tags,
    work_queue_name: source.workQueueName,
    work_pool_name: source.workPoolName,
    infra_overrides: source.infrastructureOverrides,
  }
}

export const mapDeploymentFlowRunCreateToDeploymentFlowRunRequest: MapFunction<DeploymentFlowRunCreate, DeploymentFlowRunRequest> = function(source) {
  return {
    name: source.name,
    parameters: source.parameters ? this.map('SchemaValues', { values: source.parameters, schema: source.schema }, 'SchemaValuesRequest') : undefined,
    idempotency_key: source.idempotencyKey,
    context: source.context,
    tags: source.tags,
    parent_task_run_id: source.parentTaskRunId,
    infrastructure_document_id: source.infrastructureDocumentId,
    state: this.map('StateCreate', source.state, 'StateRequest'),
    empirical_policy: this.map('EmpiricalPolicy', source.empiricalPolicy, 'EmpiricalPolicyRequest'),
    work_queue_name: source.workQueueName,
  }
}

