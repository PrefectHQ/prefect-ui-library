import { Parameters } from '@/models/Parameters'
import { StateCreate } from '@/models/StateCreate'

export type DeploymentFlowRunCreate = Partial<{
  name: string | null,
  parameters: Parameters,
  idempotencyKey: string | null,
  context: unknown,
  empiricalPolicy: unknown,
  tags: string[] | null,
  parentTaskRunId: string | null,
  infrastructureDocumentId: string | null,
  state: StateCreate,
}>