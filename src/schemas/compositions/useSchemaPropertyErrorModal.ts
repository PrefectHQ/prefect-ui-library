import { InjectionKey } from 'vue'
import { injectFromSelfOrAncestor } from '@/utilities/inject'

export type UseSchemaPropertyErrorModal = {
  open: (message: string) => void,
}

export const schemaPropertyErrorModalKey: InjectionKey<UseSchemaPropertyErrorModal> = Symbol()

export function useSchemaPropertyErrorModal(): UseSchemaPropertyErrorModal {
  const value = injectFromSelfOrAncestor(schemaPropertyErrorModalKey)

  if (!value) {
    throw new Error('SchemaPropertyErrorModal not provided')
  }

  return value
}