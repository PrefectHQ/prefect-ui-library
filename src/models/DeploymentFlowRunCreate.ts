import { EmpiricalPolicy } from '@/models/EmpiricalPolicy'
import { StateCreate } from '@/models/StateCreate'
import { SchemaValuesV2 } from '@/schemas'
import { Schema, SchemaValues } from '@/types/schemas'

type Base = {
  name?: string | null,
  idempotencyKey?: string | null,
  context?: unknown,
  empiricalPolicy?: EmpiricalPolicy,
  tags?: string[] | null,
  parentTaskRunId?: string | null,
  infrastructureDocumentId?: string | null,
  state?: StateCreate,
  workQueueName?: string | null,
  jobVariables?: Record<string, unknown>,
}

type WithoutParameters = Base & {
  schema?: never,
  parameters?: never,
}

type WithParameters = Base & {
  schema: Schema,
  parameters: SchemaValues,
}

/**
 * @deprecated Use DeploymentFlowRunCreateV2
 */
export type DeploymentFlowRunCreate = WithoutParameters | WithParameters

type WithParametersV2 = Base & {
  parameters: SchemaValuesV2,
}

export type DeploymentFlowRunCreateV2 = WithoutParameters | WithParametersV2