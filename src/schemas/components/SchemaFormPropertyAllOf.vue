<template>
  <SchemaFormProperty v-model:value="value" :property="property" :required="required" />
</template>

<script lang="ts" setup>
  import merge from 'lodash.merge'
  import { computed } from 'vue'
  import SchemaFormProperty from '@/schemas/components/SchemaFormProperty.vue'
  import { useSchema } from '@/schemas/compositions/useSchema'
  import { SchemaProperty, isPropertyWith } from '@/schemas/types/schema'
  import { SchemaValue } from '@/schemas/types/schemaValues'
  import { getSchemaDefinition } from '@/schemas/utilities/definitions'
  import { Require } from '@/types/utilities'

  const props = defineProps<{
    property: Require<SchemaProperty, 'allOf'>,
    value: SchemaValue,
    required: boolean,
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

  const schema = useSchema()

  const property = computed(() => props.property.allOf.reduce<SchemaProperty>((property, definition) => {
    if (isPropertyWith(definition, '$ref')) {
      return merge(property, getSchemaDefinition(schema, definition.$ref))
    }

    return merge(property, definition)
  }, {}))
</script>