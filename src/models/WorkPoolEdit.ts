import { SchemaValues, WorkerBaseJobTemplate } from '@/types/schemas'

export type WorkPoolEdit = Partial<{
  description: string | null,
  isPaused: boolean,
  concurrencyLimit: number | null,
  baseJobTemplate: WorkerBaseJobTemplate,
  updatedDefaultVariableValues: SchemaValues,
}>