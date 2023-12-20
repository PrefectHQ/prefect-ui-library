export type FlowStatsFilter = {
  timeSpanInSeconds: number | null,
  flowId: string,
  expectedStartTimeAfter?: Date | null,
  expectedStartTimeBefore?: Date | null,
}
