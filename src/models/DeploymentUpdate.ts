import { Schedule } from '@/models/Schedule'
import { Schema, SchemaValues } from '@/types/schemas'

type Base = {
  description?: string | null,
  schedule?: Schedule | null,
  isScheduleActive?: boolean,
  tags?: string[] | null,
  workQueueName?: string | null,
  workPoolName?: string | null,
  infrastructureOverrides?: Record<string, unknown> | null,
}

type BaseEdit = {
  description?: string | null,
  schedule?: Schedule | null,
  isScheduleActive?: boolean,
  tags?: string[] | null,
  workQueueName?: string | null,
  workPoolName?: string | null,
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

export type DeploymentUpdate = WithoutParameters | WithParameters
export type DeploymentEdit = WithoutParametersEdit | WithParametersEdit