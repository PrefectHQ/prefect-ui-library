export type WorkQueueEdit = Partial<{
  description: string | null,
  isPaused: boolean | null,
  concurrencyLimit: number | null,
}>