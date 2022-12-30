export type WorkerScheduledFlowRuns = Partial<{
  workerPoolQueueNames: string[],
  scheduledBefore: string,
  scheduledAfter: string,
  limit: number,
}>