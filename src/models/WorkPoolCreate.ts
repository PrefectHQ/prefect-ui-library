export type WorkPoolCreate = Partial<{
  name: string,
  description: string,
  type: string,
  isPaused: boolean,
  concurrencyLimit: number,
}>