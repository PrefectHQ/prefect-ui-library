import { ServerStateType } from '@/models/StateType'

export type StateHistoryResponse = {
  state_type: ServerStateType,
  state_name: string,
  count_runs: number,
  sum_estimated_run_time: number,
  sum_estimated_lateness: number,
}