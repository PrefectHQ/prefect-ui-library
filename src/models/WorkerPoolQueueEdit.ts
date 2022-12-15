export type WorkerPoolQueueEdit = {
  name?: string,
  description?: string | null,
  isPaused?: boolean,
  concurrencyLimit?: number | null,
  priority?: number,
}