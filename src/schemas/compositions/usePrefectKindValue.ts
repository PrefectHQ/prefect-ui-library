import { isDefined } from '@prefecthq/prefect-design'
import debounce from 'lodash.debounce'
import isEqual from 'lodash.isequal'
import { MaybeRefOrGetter, Ref, ref, toValue, watch } from 'vue'
import { useWorkspaceApi } from '@/compositions'
import { useSchema } from '@/schemas/compositions/useSchema'
import { mapSchemaValue } from '@/schemas/maps/schemaValue'
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
  const schema = useSchema()
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

    valueMap[currentKind] = structuredClone(getRawValue(schemaValue.value))

    // see if we can map the value to the new kind
    const mapped = mapSchemaValue(schemaValue.value, to)

    // we cannot convert workspace variables and most jinja values so revert back to a previous value if we have one
    if (!isDefined(mapped) && (currentKind === 'jinja' || currentKind === 'workspace_variable')) {
      schemaValue.value = valueMap[to]
      return
    }

    schemaValue.value = mapped
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

  watch(errors, (errors, previous) => {
    if (!errors.length || isEqual(errors, previous)) {
      return
    }

    validatePropertyValueDebounced()
  }, { deep: true })

  return {
    errors,
    setKind,
  }

}