import { SchemaValues } from '@/types/schemas'

export type WorkPoolCreate = Partial<{
  name: string,
  description: string,
  type: string,
  isPaused: boolean,
  concurrencyLimit: number,
  baseJobTemplate: Record<string, unknown>,
  defaultVariableValues: SchemaValues,
}>