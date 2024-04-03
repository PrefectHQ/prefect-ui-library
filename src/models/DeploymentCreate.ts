import { ScheduleResponse } from '@/models'
import { SchemaResponse } from '@/models/api/SchemaResponse'
import { SchemaResponseV2, SchemaValuesV2 } from '@/schemas'

type Base = {
  description?: string | null,
  paused?: boolean,
  tags?: string[] | null,
  workPoolName?: string | null,
  infrastructureOverrides?: Record<string, unknown> | null,
  enforceParameterSchema?: boolean,
  name: string | null,
  flowId: string | null,
  schedule: ScheduleResponse | null,
  isScheduleActive: boolean,
  storageDocumentId: string | null,
  infrastructureDocumentId: string | null,
  workQueueName?: string | null,
  manifestPath: string | null,
  path: string | null,
  entrypoint: string | null,
  parameterOpenapiSchema: SchemaResponse | SchemaResponseV2 | null,
  pullSteps: unknown,
}

type WithParametersV2 = Base & {
  parameters: SchemaValuesV2,
}

type WithoutParameters = Base & {
  schema?: never,
  parameters?: never,
}


export type DeploymentCreate = WithoutParameters | WithParametersV2
