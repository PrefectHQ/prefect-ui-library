import { InjectionKey, inject } from 'vue'
import { Schema } from '@/schemas/types/schema'

export const schemaInjectionKey: InjectionKey<Schema> = Symbol()

export function useSchema(): Schema {
  const schema = inject(schemaInjectionKey)

  if (!schema) {
    throw new Error('No schema was provided')
  }

  return schema
}