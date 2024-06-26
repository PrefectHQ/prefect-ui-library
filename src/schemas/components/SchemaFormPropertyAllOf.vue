<template>
  <SchemaFormProperty v-model:value="value" :property="mergedProperty" :required :errors :property-for-validation="property" />
</template>

<script lang="ts" setup>
  import merge from 'lodash.merge'
  import { computed } from 'vue'
  import SchemaFormProperty from '@/schemas/components/SchemaFormProperty.vue'
  import { useSchemaFormSettings } from '@/schemas/compositions/useSchemaFormSettings'
  import { SchemaProperty, isPropertyWith } from '@/schemas/types/schema'
  import { SchemaValue } from '@/schemas/types/schemaValues'
  import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'
  import { getSchemaDefinition } from '@/schemas/utilities/definitions'
  import { Require } from '@/types/utilities'

  const props = defineProps<{
    property: Require<SchemaProperty, 'allOf'>,
    value: SchemaValue,
    required: boolean,
    errors: SchemaValueError[],
  }>()

  const emit = defineEmits<{
    'update:value': [SchemaValue],
  }>()

  const value = computed({
    get() {
      return props.value
    },
    set(value) {
      emit('update:value', value)
    },
  })

  const { schema } = useSchemaFormSettings()

  const mergedProperty = computed(() => {
    const { allOf, ...baseProperty } = props.property

    const definitions = allOf.reduce<SchemaProperty>((property, definition) => {
      if (isPropertyWith(definition, '$ref')) {
        return merge({}, getSchemaDefinition(schema, definition.$ref), property)
      }

      return merge({}, property, definition)
    }, {})

    return merge({}, definitions, baseProperty)
  })
</script>