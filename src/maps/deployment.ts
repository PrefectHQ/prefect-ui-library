import { sortStringArray } from '@prefecthq/prefect-design'
import { readonly } from 'vue'
import { DeploymentFlowRunCreate, DeploymentFlowRunCreateV2, DeploymentFlowRunRequest, DeploymentUpdate, DeploymentUpdateRequest, DeploymentUpdateV2, SchemaResponse } from '@/models'
import { DeploymentResponse } from '@/models/api/DeploymentResponse'
import { Deployment } from '@/models/Deployment'
import { createObjectLevelCan } from '@/models/ObjectLevelCan'
import { SchemaResponseV2, schemaV2Mapper } from '@/schemas'
import { MapFunction } from '@/services/Mapper'
import { Schema } from '@/types/schemas'

export const mapDeploymentResponseToDeployment: MapFunction<DeploymentResponse, Deployment> = function(source) {
  const parameters = readonly(source.parameters)
  const rawSchema = source.parameter_openapi_schema ?? {}
  const schema = this.map('SchemaResponse', rawSchema as SchemaResponse, 'Schema')
  const values = this.map('SchemaValuesResponse', { values: parameters, schema }, 'SchemaValues')
  const schedules = source.schedules.map(schedule => this.map('DeploymentScheduleResponse', schedule, 'DeploymentSchedule'))

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
    schedules: schedules,
    parameters: values,
    rawParameters: parameters,
    rawSchema: rawSchema as Schema,
    parametersV2: parameters,
    parameterOpenApiSchemaV2: schemaV2Mapper.map('SchemaResponse', rawSchema as SchemaResponseV2, 'Schema'),
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
    enforceParameterSchema: source.enforce_parameter_schema,
    pullSteps: source.pull_steps,
    can: createObjectLevelCan(),
    status: this.map('ServerDeploymentStatus', source.status, 'DeploymentStatus'),
  })
}

export const mapDeploymentUpdateToDeploymentUpdateRequest: MapFunction<DeploymentUpdate, DeploymentUpdateRequest> = function(source) {
  return {
    description: source.description,
    parameters: source.parameters ? this.map('SchemaValues', { values: source.parameters, schema: source.schema }, 'SchemaValuesRequest') : undefined,
    paused: source.paused,
    tags: source.tags,
    work_queue_name: source.workQueueName,
    work_pool_name: source.workPoolName,
    infra_overrides: source.infrastructureOverrides,
    enforce_parameter_schema: source.enforceParameterSchema,
  }
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
  }
}
