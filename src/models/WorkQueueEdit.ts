export type WorkQueueEdit = Partial<{
  description: string | null,
  isPaused: boolean,
  concurrencyLimit: number | null,
}>
