export type WorkPoolEdit = Partial<{
  description: string | null,
  isPaused: boolean,
  concurrencyLimit: number | null,
  baseJobTemplate: Record<string, unknown>,
}>