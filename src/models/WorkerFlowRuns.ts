export type WorkerFlowRuns = Partial<{
  workerPoolQueueNames: string[],
  scheduledBefore: string,
  scheduledAfter: string,
  limit: number,
}>