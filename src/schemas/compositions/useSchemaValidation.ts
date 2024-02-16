import debounce from 'lodash.debounce'
import { MaybeRefOrGetter, Ref, computed, ref, toValue, watch } from 'vue'
import { useWorkspaceApi } from '@/compositions'
import { Schema } from '@/schemas/types/schema'
import { SchemaValues } from '@/schemas/types/schemaValues'
import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'

type UseSchemaValidation = {
  valid: Ref<boolean>,
  errors: Ref<SchemaValueError[]>,
  validate: () => Promise<boolean>,
}

export function useSchemaValidation(schema: MaybeRefOrGetter<Schema>, values: MaybeRefOrGetter<SchemaValues>): UseSchemaValidation {
  const api = useWorkspaceApi()
  const errors = ref<SchemaValueError[]>([])
  const valid = computed(() => errors.value.length === 0)

  async function validate(): Promise<boolean> {
    const { valid, errors: errorsResponse } = await api.schemas.validate(toValue(schema), toValue(values))

    errors.value = errorsResponse

    return valid
  }

  const validateDebounced = debounce(validate, 1_000)

  watch(values, () => {
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
  }
}