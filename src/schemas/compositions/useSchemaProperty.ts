import { ComputedRef, MaybeRefOrGetter, computed, toValue } from 'vue'
import { useSchema } from '@/schemas/compositions/useSchema'
import { Schema, SchemaProperty } from '@/schemas/types/schema'
import { mergeSchemaPropertyDefinition } from '@/schemas/utilities/definitions'

type UseSchemaProperty = {
  property: ComputedRef<SchemaProperty>,
  label: ComputedRef<string>,
  description: ComputedRef<string>,
  disabled: ComputedRef<boolean>,
}

type UseSchemaPropertyContext = {
  required?: MaybeRefOrGetter<boolean>,
  schema?: MaybeRefOrGetter<Schema>,
}

export function useSchemaProperty(source: MaybeRefOrGetter<SchemaProperty>, context: UseSchemaPropertyContext = {}): UseSchemaProperty {
  const schema = context.schema ?? useSchema()

  const property = computed(() => {
    const value = toValue(source)

    return mergeSchemaPropertyDefinition(value, toValue(schema))
  })


  const label = computed(() => {
    const title = property.value.title ?? ''

    if (!toValue(context.required)) {
      return `${title} (Optional)`.trim()
    }

    return title
  })

  const description = computed(() => {
    const { description = '' } = property.value
    const descriptionWithNewlinesRemoved = description.replace(/\n(?!\n)/g, ' ')

    return descriptionWithNewlinesRemoved
  })

  const disabled = computed(() => Boolean(property.value.const))

  return {
    property,
    label,
    description,
    disabled,
  }
}