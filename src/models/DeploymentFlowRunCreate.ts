import { EmpiricalPolicy } from '@/models/EmpiricalPolicy'
import { StateCreate } from '@/models/StateCreate'
import { SchemaValuesV2 } from '@/schemas'

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
  enforceParameterSchema?: boolean | null,
}

type WithoutParameters = Base & {
  schema?: never,
  parameters?: never,
}

type WithParameters = Base & {
  parameters: SchemaValuesV2,
}

export type DeploymentFlowRunCreate = WithoutParameters | WithParameters