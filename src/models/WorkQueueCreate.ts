export type WorkQueueCreate = {
  name: string,
  description?: string | null,
  isPaused?: boolean | null,
  concurrencyLimit?: number | null,
}