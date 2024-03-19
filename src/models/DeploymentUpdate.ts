import { SchemaValuesV2 } from '@/schemas'
import { Schema, SchemaValues } from '@/types/schemas'

type Base = {
  description?: string | null,
  paused?: boolean,
  tags?: string[] | null,
  workQueueName?: string | null,
  workPoolName?: string | null,
  infrastructureOverrides?: Record<string, unknown> | null,
  enforceParameterSchema?: boolean,
}

type BaseEdit = Omit<Base, 'infrastructureOverrides'> & {
  infrastructureOverrides?: string,
}

type WithoutParameters = Base & {
  schema?: never,
  parameters?: never,
}

type WithoutParametersEdit = BaseEdit & {
  schema?: never,
  parameters?: never,
}

type WithParameters = Base & {
  schema: Schema,
  parameters: SchemaValues,
}

type WithParametersEdit = BaseEdit & {
  schema: Schema,
  parameters: SchemaValues,
}

/**
 * @deprecated Use DeploymentUpdateV2
 */
export type DeploymentUpdate = WithoutParameters | WithParameters
export type DeploymentEdit = WithoutParametersEdit | WithParametersEdit

type WithParametersV2 = Base & {
  parameters: SchemaValuesV2,
}

export type DeploymentUpdateV2 = WithoutParameters | WithParametersV2
