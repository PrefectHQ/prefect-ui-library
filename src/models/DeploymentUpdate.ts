import { SchemaValuesV2 } from '@/schemas'

type Base = {
  description?: string | null,
  paused?: boolean,
  tags?: string[] | null,
  workQueueName?: string | null,
  workPoolName?: string | null,
  jobVariables?: Record<string, unknown> | null,
  enforceParameterSchema?: boolean,
  concurrencyLimit?: number | null,
}

type WithoutParameters = Base & {
  schema?: never,
  parameters?: never,
}

type WithParameters = Base & {
  parameters: SchemaValuesV2,
}

export type DeploymentUpdateV2 = WithoutParameters | WithParameters
export type DeploymentUpdate = DeploymentUpdateV2
