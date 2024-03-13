import debounce from 'lodash.debounce'
import { MaybeRefOrGetter, Ref, computed, ref, toValue, watch } from 'vue'
import { useWorkspaceApi } from '@/compositions'
import { Schema } from '@/schemas/types/schema'
import { SchemaValues } from '@/schemas/types/schemaValues'
import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'
import { isNullish } from '@/utilities'

type UseSchemaValidation = {
  valid: Ref<boolean>,
  errors: Ref<SchemaValueError[]>,
  validate: () => Promise<boolean>,
  reset: () => void,
}

export function useSchemaValidation(schema: MaybeRefOrGetter<Schema | null | undefined>, values: MaybeRefOrGetter<SchemaValues | null | undefined>): UseSchemaValidation {
  const api = useWorkspaceApi()
  const errors = ref<SchemaValueError[]>([])
  const valid = computed(() => errors.value.length === 0)

  async function validate(): Promise<boolean> {
    const schemaValue = toValue(schema)
    const valuesValue = toValue(values)

    if (isNullish(schemaValue) || isNullish(valuesValue)) {
      return true
    }

    const { valid, errors: errorsResponse } = await api.schemas.validate(schemaValue, valuesValue)

    errors.value = errorsResponse

    return valid
  }

  function reset(): void {
    errors.value = []
  }

  const validateDebounced = debounce(validate, 1_000)

  watch(() => toValue(values), () => {
    // if there are no errors we can wait until the user clicks submit
    if (!errors.value.length) {
      return
    }

    validateDebounced()
  }, { deep: true })

  return {
    validate,
    errors,
    valid,
    reset,
  }
}