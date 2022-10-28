export type WorkQueueCreate = {
  name: string,
  description?: string,
  isPaused?: boolean,
  concurrencyLimit?: number,
}
