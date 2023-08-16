import { EmpiricalPolicy } from '@/models/EmpiricalPolicy'
import { StateCreate } from '@/models/StateCreate'
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
}

type WithoutParameters = Base & {
  schema?: never,
  parameters?: never,
}

type WithParameters = Base & {
  schema: Schema,
  parameters: SchemaValues,
}

export type DeploymentFlowRunCreate = WithoutParameters | WithParameters