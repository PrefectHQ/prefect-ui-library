export type WorkerPoolCreate = Partial<{
  name: string,
  description: string,
  type: string,
  isPaused: boolean,
  concurrencyLimit: number,
}>