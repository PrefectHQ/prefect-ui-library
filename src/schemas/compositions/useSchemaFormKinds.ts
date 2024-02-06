import { InjectionKey, inject } from 'vue'
import { PrefectKind, prefectKinds } from '@/schemas/types/schemaValues'

export const schemaFormKindsInjectionKey: InjectionKey<Readonly<PrefectKind[]>> = Symbol()

export function useSchemaFormKinds(): Readonly<PrefectKind[]> {
  return inject(schemaFormKindsInjectionKey, prefectKinds)
}