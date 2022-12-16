export type WorkerPoolEdit = Partial<{
  description: string,
  isPaused: boolean,
  concurrencyLimit: number,
}>