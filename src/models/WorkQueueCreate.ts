export type WorkQueueCreate = {
  name: string,
  description?: string | null,
  isPaused?: boolean,
  concurrencyLimit?: number | null,
}
