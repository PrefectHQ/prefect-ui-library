import { ComputedRef, MaybeRef, computed, ref } from 'vue'
import { SchemaResponse } from '@/models'
import { Schema } from '@/types'

export type UseOptionalPropertiesSchema = {
  schema: ComputedRef<Schema>,
}

export function useOptionalPropertiesSchema(rawSchema: MaybeRef<SchemaResponse | Schema>): UseOptionalPropertiesSchema {
  const rawSchemaRef = ref(rawSchema)

  const computedSchema = computed(() => {
    rawSchemaRef.value.required = []
    return rawSchemaRef.value
  })

  return {
    schema: computedSchema,
  }
}
