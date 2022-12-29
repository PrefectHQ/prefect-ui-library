export type WorkerScheduledFlowRunsRequest = Partial<{
  worker_pool_queue_names: string[],
  scheduled_before: string,
  scheduled_after: string,
  limit: number,
}>