import { InjectionKey } from 'vue'
import { Schema } from '@/schemas/types/schema'
import { injectFromSelfOrAncestor } from '@/utilities'

export const schemaInjectionKey: InjectionKey<Schema> = Symbol()

export function useSchema(): Schema {
  const schema = injectFromSelfOrAncestor(schemaInjectionKey)

  if (!schema) {
    throw new Error('No schema was provided')
  }

  return schema
}