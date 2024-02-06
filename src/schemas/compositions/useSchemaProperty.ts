import merge from 'lodash.merge'
import { ComputedRef, MaybeRefOrGetter, computed, toValue } from 'vue'
import { useSchema } from '@/schemas/compositions/useSchema'
import { SchemaProperty, isPropertyWith } from '@/schemas/types/schema'
import { getSchemaDefinition } from '@/schemas/utilities/definitions'

type UseSchemaProperty = {
  property: ComputedRef<SchemaProperty>,
  label: ComputedRef<string>,
  description: ComputedRef<string>,
  disabled: ComputedRef<boolean>,
}

export function useSchemaProperty(source: MaybeRefOrGetter<SchemaProperty>, required?: MaybeRefOrGetter<boolean>): UseSchemaProperty {
  const schema = useSchema()

  const property = computed(() => {
    const value = toValue(source)

    if (isPropertyWith(value, '$ref')) {
      return merge({}, getSchemaDefinition(schema, value.$ref), value)
    }

    return value
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