<template>
  <p-card class="schema-form-property-object">
    <SchemaFormProperties v-model:values="values" :parent="property" :properties="property.properties ?? {}" :errors="errors" />
  </p-card>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import SchemaFormProperties from '@/schemas/components/SchemaFormProperties.vue'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { PrefectKindJson, SchemaValues } from '@/schemas/types/schemaValues'
  import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'
  import { isNullish } from '@/utilities'
  import { asJson } from '@/utilities/types'

  const props = defineProps<{
    property: SchemaProperty & { type: 'object' },
    values: SchemaValues | undefined,
    errors: SchemaValueError[],
  }>()

  const emit = defineEmits<{
    'update:values': [SchemaValues | undefined],
  }>()

  if (isNullish(props.property.properties)) {
    const json: PrefectKindJson = {
      __prefect_kind: 'json',
      value: asJson(props.values),
    }

    emit('update:values', json)
  }

  const values = computed({
    get() {
      return props.values
    },
    set(values) {
      emit('update:values', values)
    },
  })
</script>