import { StateCreate } from '@/models/StateCreate'
import { SchemaValues } from '@/types/schemas'

export type DeploymentFlowRunCreate = Partial<{
  name: string | null,
  parameters: SchemaValues,
  idempotencyKey: string | null,
  context: unknown,
  empiricalPolicy: unknown,
  tags: string[] | null,
  parentTaskRunId: string | null,
  infrastructureDocumentId: string | null,
  state: StateCreate,
}>