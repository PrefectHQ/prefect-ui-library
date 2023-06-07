export type TaskRunHistoryStateResponse = {
  state_type: string,
  state_name: string,
  count_runs: number,
  sum_estimated_run_time: number,
  sum_estimated_lateness: number,
}

export type TaskRunHistoryResponse = {
  interval_start: string,
  interval_end: string,
  states: TaskRunHistoryStateResponse[],
}