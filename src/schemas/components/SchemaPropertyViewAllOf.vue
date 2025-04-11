<template>
  <SchemaPropertyView :value="value" :property="mergedProperty" :required />
</template>

<script lang="ts" setup>
  import merge from 'lodash.merge'
  import { computed } from 'vue'
  import SchemaPropertyView from '@/schemas/components/SchemaPropertyView.vue'
  import { useSchemaFormSettings } from '@/schemas/compositions/useSchemaFormSettings'
  import { SchemaProperty, isPropertyWith } from '@/schemas/types/schema'
  import { SchemaValue } from '@/schemas/types/schemaValues'
  import { getSchemaDefinition } from '@/schemas/utilities/definitions'
  import { Require } from '@/types/utilities'

  const { property, value, required } = defineProps<{
    property: Require<SchemaProperty, 'allOf'>,
    value: SchemaValue,
    required: boolean,
  }>()

  const { schema } = useSchemaFormSettings()

  const mergedProperty = computed(() => {
    const { allOf, ...baseProperty } = property

    const definitions = allOf.reduce<SchemaProperty>((property, definition) => {
      if (isPropertyWith(definition, '$ref')) {
        return merge({}, getSchemaDefinition(schema, definition.$ref), property)
      }

      return merge({}, property, definition)
    }, {})

    return merge({}, definitions, baseProperty)
  })
</script>