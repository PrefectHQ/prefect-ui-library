import { StateRequest } from '@/models/api/StateRequest'
import { SchemaValues } from '@/types/schemas'

export type DeploymentFlowRunRequest = Partial<{
  name: string | null,
  parameters: SchemaValues,
  idempotency_key: string | null,
  context: unknown,
  empirical_policy: unknown,
  tags: string[] | null,
  parent_task_run_id: string | null,
  infrastructure_document_id: string | null,
  state: Partial<StateRequest>,
  work_queue_name: string | null,
}>