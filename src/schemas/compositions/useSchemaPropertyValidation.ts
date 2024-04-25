import { Ref, computed, ref } from 'vue'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'

type UseSchemaPropertyValidation = {
  valid: Ref<boolean>,
  errors: Ref<SchemaValueError[]>,
  validate: () => Promise<boolean>,
  reset: () => void,
}

export function useSchemaPropertyValidation(): UseSchemaPropertyValidation {
  const api = useWorkspaceApi()
  const errors = ref<SchemaValueError[]>([])
  const valid = computed(() => errors.value.length === 0)

  async function validate(): Promise<boolean> {

  }

  function reset(): void {
    errors.value = []
  }

  return {
    errors,
    valid,
    validate,
    reset,
  }
}