import { ComputedRef, MaybeRef, computed, ref } from 'vue'
import { mapper } from '@/services'
import { Schema, SchemaValues } from '@/types'

export type UseOptionalPropertiesSchema = {
  schema: ComputedRef<Schema>,
}

export function useOptionalPropertiesSchema(rawSchema: MaybeRef<SchemaValues>): UseOptionalPropertiesSchema {
  const rawSchemaRef = ref(rawSchema)

  const computedSchema = computed(() => {
    rawSchemaRef.value.required = []

    return mapper.map('SchemaResponse', rawSchemaRef.value, 'Schema')
  })

  return {
    schema: computedSchema,
  }
}
