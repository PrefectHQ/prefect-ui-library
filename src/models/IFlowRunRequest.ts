import { IStateRequest } from '@/models/IStateRequest'

export type IDeploymentFlowRunRequest = Partial<{
  name: string | null,
  parameters: Record<string, unknown>,
  idempotency_key: string | null,
  context: unknown,
  empirical_policy: unknown,
  tags: string[] | null,
  parent_task_run_id: string | null,
  infrastructure_document_id: string | null,
  state: IStateRequest,
}>