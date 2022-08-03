import { Parameters } from '@/models/Parameters'
import { StateRequest } from '@/models/StateRequest'

export type DeploymentFlowRunRequest = Partial<{
  name: string | null,
  parameters: Parameters,
  idempotency_key: string | null,
  context: unknown,
  empirical_policy: unknown,
  tags: string[] | null,
  parent_task_run_id: string | null,
  infrastructure_document_id: string | null,
  state: Partial<StateRequest>,
}>