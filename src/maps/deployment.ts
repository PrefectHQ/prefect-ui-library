import { sortStringArray } from '@prefecthq/prefect-design'
import { DeploymentFlowRunCreateV2, DeploymentFlowRunRequest, DeploymentUpdateRequest, DeploymentUpdateV2 } from '@/models'
import { DeploymentResponse } from '@/models/api/DeploymentResponse'
import { Deployment } from '@/models/Deployment'
import { createObjectLevelCan } from '@/models/ObjectLevelCan'
import { schemaV2Mapper } from '@/schemas'
import { MapFunction } from '@/services/Mapper'

export const mapDeploymentResponseToDeployment: MapFunction<DeploymentResponse, Deployment> = function(source) {
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
    paused: source.paused,
    schedules: source.schedules.map(schedule => this.map('DeploymentScheduleResponse', schedule, 'DeploymentSchedule')),
    parametersV2: source.parameters,
    parameterOpenApiSchemaV2: schemaV2Mapper.map('SchemaResponse', source.parameter_openapi_schema, 'Schema'),
    tags: source.tags ? sortStringArray(source.tags) : null,
    manifestPath: source.manifest_path,
    path: source.path,
    entrypoint: source.entrypoint,
    storageDocumentId: source.storage_document_id,
    infrastructureDocumentId: source.infrastructure_document_id,
    infrastructureOverrides: source.infra_overrides,
    workQueueName: source.work_queue_name,
    workPoolName: source.work_pool_name,
    enforceParameterSchema: source.enforce_parameter_schema,
    pullSteps: source.pull_steps,
    can: createObjectLevelCan(),
    status: this.map('ServerDeploymentStatus', source.status, 'DeploymentStatus'),
  })
}

export const mapDeploymentUpdateV2ToDeploymentUpdateRequest: MapFunction<DeploymentUpdateV2, DeploymentUpdateRequest> = function(source) {
  return {
    description: source.description,
    parameters: source.parameters,
    paused: source.paused,
    tags: source.tags,
    work_queue_name: source.workQueueName,
    work_pool_name: source.workPoolName,
    infra_overrides: source.infrastructureOverrides,
    enforce_parameter_schema: source.enforceParameterSchema,
  }
}

export const mapDeploymentFlowRunCreateV2ToDeploymentFlowRunRequest: MapFunction<DeploymentFlowRunCreateV2, DeploymentFlowRunRequest> = function(source) {
  return {
    name: source.name,
    parameters: source.parameters,
    idempotency_key: source.idempotencyKey,
    context: source.context,
    tags: source.tags,
    parent_task_run_id: source.parentTaskRunId,
    infrastructure_document_id: source.infrastructureDocumentId,
    state: this.map('StateCreate', source.state, 'StateRequest'),
    empirical_policy: this.map('EmpiricalPolicy', source.empiricalPolicy, 'EmpiricalPolicyRequest'),
    work_queue_name: source.workQueueName,
    job_variables: source.jobVariables,
  }
}
