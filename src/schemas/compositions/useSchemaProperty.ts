import merge from 'lodash.merge'
import { ComputedRef, MaybeRefOrGetter, computed, toValue } from 'vue'
import { useSchema } from '@/schemas/compositions/useSchema'
import { SchemaProperty, isPropertyWith } from '@/schemas/types/schema'
import { getSchemaDefinition } from '@/schemas/utilities/definitions'

export function useSchemaProperty(source: MaybeRefOrGetter<SchemaProperty>): ComputedRef<SchemaProperty> {
  const schema = useSchema()

  const property = computed(() => {
    const value = toValue(source)

    if (isPropertyWith(value, '$ref')) {
      return merge({}, getSchemaDefinition(schema, value.$ref), value)
    }

    return value
  })

  return property
}