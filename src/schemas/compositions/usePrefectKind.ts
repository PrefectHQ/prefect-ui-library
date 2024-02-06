import { Ref, computed } from 'vue'
import { PrefectKind, isPrefectKindValue } from '@/schemas/types/schemaValues'

export type UsePrefectKind = {
  kind: Ref<PrefectKind>,
}

export function usePrefectKind(propertyValue: Ref<unknown>): UsePrefectKind {
  const kindValuesMap: Partial<Record<PrefectKind, unknown>> = {}

  const kind = computed<PrefectKind>({
    get() {
      if (isPrefectKindValue(propertyValue.value)) {
        return propertyValue.value.__prefect_kind
      }

      return 'none'
    },
    set(__prefect_kind) {
      kindValuesMap[kind.value] = propertyValue.value

      if (__prefect_kind in kindValuesMap) {
        propertyValue.value = kindValuesMap[__prefect_kind]
        return
      }

      propertyValue.value = { __prefect_kind }
    },
  })

  return {
    kind,
  }
}