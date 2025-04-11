import { InjectionKey } from 'vue'
import { Schema } from '@/schemas/types/schema'
import { PrefectKind } from '@/schemas/types/schemaValues'
import { injectFromSelfOrAncestor } from '@/utilities/inject'

export type SchemaViewSettings = {
  schema: Schema,
  kinds: PrefectKind[],
}

export const schemaViewSettingsInjectionKey: InjectionKey<Readonly<SchemaViewSettings>> = Symbol()

export function useSchemaViewSettings(): Readonly<SchemaViewSettings> {
  return injectFromSelfOrAncestor(schemaViewSettingsInjectionKey)
}