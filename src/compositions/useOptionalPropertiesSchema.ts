import { merge } from 'lodash'
import { ComputedRef, MaybeRef, computed, ref } from 'vue'
import { SchemaResponse } from '@/models'
import { mapper } from '@/services'
import { Schema } from '@/types'

export type UseOptionalPropertiesSchema = {
  schema: ComputedRef<Schema>,
}

export function useOptionalPropertiesSchema(rawSchema: MaybeRef<SchemaResponse | Schema>): UseOptionalPropertiesSchema {
  const rawSchemaRef = ref(rawSchema)

  const computedSchema = computed(() => {
    const newSchema = merge({}, rawSchemaRef.value)
    newSchema.required = []
    return mapper.map('SchemaResponse', newSchema, 'Schema')
  })

  return {
    schema: computedSchema,
  }
}
