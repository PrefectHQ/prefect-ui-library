export type WorkerScheduledFlowRuns = Partial<{
  workPoolQueueNames: string[],
  scheduledBefore: string,
  scheduledAfter: string,
  limit: number,
}>