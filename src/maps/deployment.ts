import { sortStringArray } from '@prefecthq/prefect-design'
import { DeploymentFlowRunCreate, DeploymentFlowRunRequest, DeploymentUpdateRequest, DeploymentUpdateV2, DeploymentVersionInfoResponse, DeploymentVersionResponse } from '@/models'
import { DeploymentApiConcurrencyOptions } from '@/models/api/DeploymentApiConcurrencyOptions'
import { DeploymentCreateRequest } from '@/models/api/DeploymentCreateRequest'
import { DeploymentResponse } from '@/models/api/DeploymentResponse'
import { Deployment, DeploymentConcurrencyOptions } from '@/models/Deployment'
import { DeploymentCreate } from '@/models/DeploymentCreate'
import { DeploymentVersion } from '@/models/DeploymentVersion'
import { DeploymentVersionInfo } from '@/models/DeploymentVersionInfo'
import { createObjectLevelCan } from '@/models/ObjectLevelCan'
import { schemaV2Mapper } from '@/schemas'
import { MapFunction } from '@/services/Mapper'
import { camelCase, mapKeys } from '@/utilities'

export const mapDeploymentResponseToDeployment: MapFunction<DeploymentResponse, Deployment> = function(source) {
  return new Deployment({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    createdBy: this.map('CreatedOrUpdatedByResponse', source.created_by, 'CreatedOrUpdatedBy'),
    updated: this.map('string', source.updated, 'Date'),
    updatedBy: this.map('CreatedOrUpdatedByResponse', source.updated_by, 'CreatedOrUpdatedBy'),
    name: source.name,
    version: source.version,
    versionInfo: source.version_info == null ? null : this.map('DeploymentVersionInfoResponse', source.version_info, 'DeploymentVersionInfo'),
    description: source.description,
    flowId: source.flow_id,
    versionId: source.version_id,
    paused: source.paused,
    schedules: source.schedules.map(schedule => this.map('DeploymentScheduleResponse', schedule, 'DeploymentSchedule')),
    parameters: source.parameters,
    parameterOpenApiSchema: schemaV2Mapper.map('SchemaResponse', source.parameter_openapi_schema ?? {}, 'Schema'),
    tags: source.tags ? sortStringArray(source.tags) : null,
    manifestPath: source.manifest_path,
    path: source.path,
    entrypoint: source.entrypoint,
    storageDocumentId: source.storage_document_id,
    infrastructureDocumentId: source.infrastructure_document_id,
    jobVariables: source.job_variables,
    workQueueName: source.work_queue_name,
    workPoolName: source.work_pool_name,
    enforceParameterSchema: source.enforce_parameter_schema,
    pullSteps: source.pull_steps,
    can: createObjectLevelCan(),
    status: this.map('ServerDeploymentStatus', source.status, 'DeploymentStatus'),
    disabled: source.disabled ?? false,
    globalConcurrencyLimit: this.map('ConcurrencyV2LimitResponse', source.global_concurrency_limit, 'ConcurrencyV2Limit'),
    concurrencyOptions: source.concurrency_options == null ? null : mapDeploymentApiConcurrencyOptionsToDeploymentConcurrencyOptions(source.concurrency_options),
  })
}

function mapDeploymentApiConcurrencyOptionsToDeploymentConcurrencyOptions(source: DeploymentApiConcurrencyOptions): DeploymentConcurrencyOptions {
  return {
    collisionStrategy: source.collision_strategy,
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
    job_variables: source.jobVariables,
    enforce_parameter_schema: source.enforceParameterSchema,
    concurrency_limit: source.concurrencyLimit,
    concurrency_options: source.concurrencyOptions == null ? null : mapDeploymentConcurrencyOptionsToDeploymentApiConcurrencyOptions(source.concurrencyOptions),
  }
}

export const mapDeploymentFlowRunCreateV2ToDeploymentFlowRunRequest: MapFunction<DeploymentFlowRunCreate, DeploymentFlowRunRequest> = function(source) {
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
    enforce_parameter_schema: source.enforceParameterSchema,
  }
}

export const mapDeploymentCreateToDeploymentCreateRequest: MapFunction<DeploymentCreate, DeploymentCreateRequest> = function(source) {
  return {
    name: source.name,
    description: source.description,
    flow_id: source.flowId,
    parameters: source.parameters,
    tags: source.tags,
    storage_document_id: source.storageDocumentId,
    infrastructure_document_id: source.infrastructureDocumentId,
    work_queue_name: source.workQueueName,
    work_pool_name: source.workPoolName,
    job_variables: source.jobVariables,
    enforce_parameter_schema: source.enforceParameterSchema,
    path: source.path,
    pull_steps: source.pullSteps,
    manifest_path: source.manifestPath,
    parameter_openapi_schema: source.parameterOpenApiSchema,
    entrypoint: source.entrypoint,
    version: source.version,
    paused: source.paused,
    concurrency_limit: source.concurrencyLimit,
    concurrency_options: source.concurrencyOptions == null ? null : mapDeploymentConcurrencyOptionsToDeploymentApiConcurrencyOptions(source.concurrencyOptions),
  }
}

function mapDeploymentConcurrencyOptionsToDeploymentApiConcurrencyOptions(source: DeploymentConcurrencyOptions): DeploymentApiConcurrencyOptions {
  return {
    collision_strategy: source.collisionStrategy,
  }
}

export const mapDeploymentVersionResponseToDeploymentVersion: MapFunction<DeploymentVersionResponse, DeploymentVersion> = function(source) {
  return new DeploymentVersion({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    createdBy: this.map('CreatedOrUpdatedByResponse', source.created_by, 'CreatedOrUpdatedBy'),
    updated: this.map('string', source.updated, 'Date'),
    updatedBy: this.map('CreatedOrUpdatedByResponse', source.updated_by, 'CreatedOrUpdatedBy'),
    name: source.name,
    deploymentId: source.deployment_id,
    description: source.description,
    versionInfo: this.map('DeploymentVersionInfoResponse', source.version_info, 'DeploymentVersionInfo'),
    tags: source.tags ? sortStringArray(source.tags) : null,
    labels: source.labels,
    entrypoint: source.entrypoint,
    pullSteps: source.pull_steps,
    parameters: source.parameters,
    parameterOpenApiSchema: schemaV2Mapper.map('SchemaResponse', source.parameter_openapi_schema ?? {}, 'Schema'),
    jobVariables: source.job_variables,
    workQueueName: source.work_queue_name,
    workPoolName: source.work_pool_name,
    enforceParameterSchema: source.enforce_parameter_schema,
  })
}

export const mapDeploymentVersionInfoResponseToDeploymentVersionInfo: MapFunction<DeploymentVersionInfoResponse, DeploymentVersionInfo> = function(source) {
  return mapKeys(source, (key) => camelCase(key)) as DeploymentVersionInfo
}
