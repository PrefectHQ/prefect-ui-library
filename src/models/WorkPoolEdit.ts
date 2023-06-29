import { BaseJobTemplate } from '@/models/BaseJobTemplate'
import { SchemaValues } from '@/types/schemas'

export type WorkPoolEdit = Partial<{
  description: string | null,
  isPaused: boolean,
  concurrencyLimit: number | null,
  baseJobTemplate: BaseJobTemplate,
  updatedDefaultVariableValues: SchemaValues,
}>