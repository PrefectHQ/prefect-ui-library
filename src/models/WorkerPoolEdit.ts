export type WorkerPoolEdit = Partial<{
  description: string | null,
  isPaused: boolean,
  concurrencyLimit: number | null,
}>