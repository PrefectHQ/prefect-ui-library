
import { SchemaResponse } from '@/models/api/SchemaResponse'
import { DeploymentSchedule } from '@/models/DeploymentSchedule'
import { SchemaResponseV2, SchemaValuesV2 } from '@/schemas'
import { SchemaValues } from '@/types/schemas'

type Base = {
  description?: string | null,
  paused?: boolean,
  tags?: string[] | null,
  workPoolName?: string | null,
  infrastructureOverrides?: Record<string, unknown> | null,
  enforceParameterSchema?: boolean,
  name: string | null,
  flowId: string | null,
  schedules?: DeploymentSchedule[] | null,
  isScheduleActive: boolean,
  storageDocumentId: string | null,
  infrastructureDocumentId: string | null,
  workQueueName?: string | null,
  manifestPath: string | null,
  path: string | null,
  entrypoint: string | null,
  parameterOpenApiSchema: SchemaResponse | SchemaResponseV2 | null,
  pullSteps: unknown,
}

type WithParametersV2Create = Base & {
  parameters: SchemaValuesV2 | SchemaValues,
}

type WithoutParametersCreate = Base & {
  schema?: never,
  parameters?: never,
}


export type DeploymentCreate = WithoutParametersCreate | WithParametersV2Create
