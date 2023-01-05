import { CreatedOrUpdatedByResponse } from '@/models/api/CreatedOrUpdatedByResponse'
import { StateResponse } from '@/models/api/StateResponse'
import { ServerStateType } from '@/models/StateType'
import { PrefectStateNames } from '@/types'
import { DateString } from '@/types/dates'
import { SchemaValues } from '@/types/schemas'

export type FlowRunResponse = {
  id: string,
  created: DateString,
  created_by: CreatedOrUpdatedByResponse | null,
  updated: DateString,
  name: string | null,
  flow_id: string,
  state_id: string | null,
  deployment_id: string | null,
  flow_version: string | null,
  parameters: SchemaValues,
  idempotency_key: string | null,
  context: unknown,
  empirical_policy: unknown,
  empirical_config: unknown,
  tags: string[] | null,
  parent_task_run_id: string | null,
  state_name: PrefectStateNames | null,
  state_type: ServerStateType | null,
  run_count: number | null,
  expected_start_time: DateString | null,
  next_scheduled_start_time: DateString | null,
  start_time: DateString | null,
  end_time: DateString | null,
  total_run_time: number,
  estimated_run_time: number,
  estimated_start_time_delta: number | null,
  auto_scheduled: boolean | null,
  state: StateResponse | null,
  work_queue_name: string | null,
  worker_pool_name: string | null,
  worker_pool_queue_name: string | null,
}