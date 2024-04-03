import { sortStringArray } from '@prefecthq/prefect-design'
import { DeploymentFlowRunCreate, DeploymentFlowRunCreateV2, DeploymentFlowRunRequest, DeploymentUpdate, DeploymentUpdateRequest, DeploymentUpdateV2, SchemaResponse } from '@/models'
import { DeploymentCreateRequest } from '@/models/api/DeploymentCreateRequest'
import { DeploymentResponse } from '@/models/api/DeploymentResponse'
import { Deployment } from '@/models/Deployment'
import { DeploymentCreate } from '@/models/DeploymentCreate'
import { createObjectLevelCan } from '@/models/ObjectLevelCan'
import { SchemaResponseV2, schemaV2Mapper } from '@/schemas'
import { MapFunction } from '@/services/Mapper'
import { Schema } from '@/types/schemas'

export const mapDeploymentResponseToDeployment: MapFunction<DeploymentResponse, Deployment> = function(source) {
  // Something modifies parameters by reference (I think) if parameters, rawParameters, and parametersV2
  // share the same object reference. Breaking all the references with structuredClone seems to fix
  // the symptoms but is a band-aid to avoid diving into v1 schemas code which will be removed from
  // deployments. Should retest if this is still needed after that.

  // to test edit this flow in the ui to make sure the default values can be updated
  // from typing import List, Optional
  // from prefect import flow, tags, task, get_run_logger

  // @flow(name="Common Pipeline")
  // def run_pipeline(
  //     pipeline_params: List[str],
  // ) -> None:
  //     pass

  // if __name__ == "__main__":
  //     run_pipeline.serve(__file__, parameters={ "pipeline_params": ["foo"]})
  const parametersV2 = structuredClone(source.parameters)


  const rawSchema = source.parameter_openapi_schema ?? {}
  const schema = this.map('SchemaResponse', rawSchema as SchemaResponse, 'Schema')
  const values = this.map('SchemaValuesResponse', { values: source.parameters, schema }, 'SchemaValues')
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
    rawParameters: source.parameters,
    rawSchema: rawSchema as Schema,
    parametersV2,
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
    job_variables: source.jobVariables,
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

export const mapDeploymentCreateToDeploymentCreateRequest: MapFunction<DeploymentCreate, DeploymentCreateRequest> = function(source) {
  return {
    name: source.name,
    description: source.description,
    flow_id: source.flowId,
    schedule: source.schedule,
    is_schedule_active: source.isScheduleActive,
    parameters: source.parameters,
    tags: source.tags,
    storage_document_id: source.storageDocumentId,
    infrastructure_document_id: source.infrastructureDocumentId,
    work_queue_name: source.workQueueName,
    work_pool_name: source.workPoolName,
    infra_overrides: source.infrastructureOverrides,
    enforce_parameter_schema: source.enforceParameterSchema,
    manifest_path: source.manifestPath,
    path: source.path,
    entrypoint: source.entrypoint,
    parameter_openapi_schema: source.parameterOpenapiSchema,
    pull_steps: source.pullSteps,
  }
}