import { ComputedRef, MaybeRefOrGetter, computed, toValue } from 'vue'
import { useSchemaViewSettings } from '@/schemas/compositions/useSchemaViewSettings'
import { SchemaProperty } from '@/schemas/types/schema'
import { mergeSchemaPropertyDefinition } from '@/schemas/utilities/definitions'

type UseSchemaProperty = {
  property: ComputedRef<SchemaProperty>,
  label: ComputedRef<string>,
  description: ComputedRef<string>,
  disabled: ComputedRef<boolean>,
}

export function useSchemaProperty(source: MaybeRefOrGetter<SchemaProperty>, required?: MaybeRefOrGetter<boolean>): UseSchemaProperty {
  const { schema } = useSchemaViewSettings()

  const property = computed(() => {
    const value = toValue(source)

    return mergeSchemaPropertyDefinition(value, schema)
  })


  const label = computed(() => {
    const title = property.value.title ?? ''

    if (!toValue(required)) {
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