<template>
  <p-card class="schema-form-property-object">
    <SchemaFormProperties v-model:values="values" :parent="property" :properties="property.properties ?? {}" :errors="errors" />
  </p-card>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import SchemaFormProperties from '@/schemas/components/SchemaFormProperties.vue'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { SchemaValues } from '@/schemas/types/schemaValues'
  import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'

  const props = defineProps<{
    property: SchemaProperty & { type: 'object' },
    values: SchemaValues | undefined,
    errors: SchemaValueError[],
  }>()

  const emit = defineEmits<{
    'update:values': [SchemaValues | undefined],
  }>()

  const values = computed({
    get() {
      return props.values
    },
    set(values) {
      emit('update:values', values)
    },
  })
</script>