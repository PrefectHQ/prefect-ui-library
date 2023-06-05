export type TaskRunHistoryState = {
  stateType: string,
  stateName: string,
  countRuns: number,
  sumEstimatedRunTime: number,
  sumEstimatedLateness: number,
}

export type TaskRunHistory = {
  intervalStart: Date,
  intervalEnd: Date,
  states: TaskRunHistoryState[],
}