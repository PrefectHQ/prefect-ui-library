import { InjectionKey } from 'vue'
import { Schema } from '@/schemas/types/schema'
import { PrefectKind } from '@/schemas/types/schemaValues'
import { injectFromSelfOrAncestor } from '@/utilities/inject'

export type SchemaFormSettings = {
  schema: Schema,
  kinds: PrefectKind[],
  skipDefaultValueInitialization: boolean,
}

export const schemaFormSettingsInjectionKey: InjectionKey<Readonly<SchemaFormSettings>> = Symbol()

export function useSchemaFormSettings(): Readonly<SchemaFormSettings> {
  return injectFromSelfOrAncestor(schemaFormSettingsInjectionKey)
}