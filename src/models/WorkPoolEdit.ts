export type WorkPoolEdit = Partial<{
  description: string | null,
  isPaused: boolean,
  concurrencyLimit: number | null,
}>