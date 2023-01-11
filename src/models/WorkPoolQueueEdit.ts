export type WorkPoolQueueEdit = {
  name?: string,
  description?: string | null,
  isPaused?: boolean,
  concurrencyLimit?: number | null,
  priority?: number,
}