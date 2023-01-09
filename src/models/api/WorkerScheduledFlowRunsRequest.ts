export type WorkerScheduledFlowRunsRequest = Partial<{
  work_pool_queue_names: string[],
  scheduled_before: string,
  scheduled_after: string,
  limit: number,
}>