import debounce from 'lodash.debounce'
import { MaybeRefOrGetter, Ref, ref, toValue, watch } from 'vue'
import { useWorkspaceApi } from '@/compositions'
import { useSchemaFormSettings } from '@/schemas/compositions/useSchemaFormSettings'
import { isInvalidSchemaValueTransformationError, mapSchemaValue } from '@/schemas/maps/schemaValue'
import { SchemaProperty } from '@/schemas/types/schema'
import { PrefectKind, getPrefectKindFromValue, isPrefectKindJson } from '@/schemas/types/schemaValues'
import { SchemaValueError, SchemaValuesValidationResponse } from '@/schemas/types/schemaValuesValidationResponse'
import { SchemaValue } from '@/types'
import { getRawValue } from '@/utilities/reactivity'

export type UsePrefectKindValueParameters = {
  property: MaybeRefOrGetter<SchemaProperty>,
  value: Ref<SchemaValue>,
}

export type UsePrefectKindValue = {
  errors: Ref<SchemaValueError[]>,
  setKind: (to: PrefectKind) => Promise<void>,
}

export function usePrefectKindValue({ property, value: schemaValue }: UsePrefectKindValueParameters): UsePrefectKindValue {
  const valueMap: Partial<Record<PrefectKind, SchemaValue>> = {}
  const errors = ref<SchemaValueError[]>([])
  const { schema } = useSchemaFormSettings()
  const api = useWorkspaceApi()

  async function setKind(to: PrefectKind): Promise<void> {
    if (isPrefectKindJson(schemaValue.value) && to === 'none') {

      // double check this specific property doesn't have any errors
      const { valid } = await validatePropertyValue()

      if (!valid) {
        return
      }
    }

    // store the current value for the current kind
    const currentKind = getPrefectKindFromValue(schemaValue.value)

    // getRawValue removes any reactivity but doesn't necessarily guarantee all references will be broken
    // structuredClone guarantees all references will be broken but errors if it encounters reactivity
    try {
      valueMap[currentKind] = structuredClone(getRawValue(schemaValue.value))
    } catch (error) {
      console.error(error)
    }

    try {
      // see if we can map the value to the new kind
      schemaValue.value = mapSchemaValue(schemaValue.value, to)

    } catch (error) {
      if (isInvalidSchemaValueTransformationError(error)) {
        if (to === 'none') {
          schemaValue.value = valueMap[to]
          return
        }

        schemaValue.value = valueMap[to] ?? { __prefect_kind: to }
      }

      throw error
    }
  }

  async function validatePropertyValue(): Promise<SchemaValuesValidationResponse> {
    const response = await api.schemas.validateSchemaValue(toValue(schemaValue), toValue(property), schema)

    if (!response.valid) {
      errors.value = response.errors
    } else {
      errors.value = []
    }

    return response
  }

  const validatePropertyValueDebounced = debounce(validatePropertyValue, 1_000)

  watch(schemaValue, () => {
    if (!errors.value.length) {
      return
    }

    validatePropertyValueDebounced()
  }, { deep: true })

  return {
    errors,
    setKind,
  }

}