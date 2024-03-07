<template>
  <p-content secondary class="schema-form-property-kind-json">
    <p-code-input v-model="value" lang="json" :state="state" show-line-numbers />
    <SchemaFormPropertyErrors :errors="childErrors" />
  </p-content>
</template>

<script lang="ts" setup>
  import { State } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import SchemaFormPropertyErrors from '@/schemas/components/SchemaFormPropertyErrors.vue'
  import { PrefectKindJson } from '@/schemas/types/schemaValues'
  import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'
  import { getAllChildSchemaPropertyErrors } from '@/schemas/utilities/errors'

  const props = defineProps<{
    value: PrefectKindJson,
    errors: SchemaValueError[],
    state: State,
  }>()

  const emit = defineEmits<{
    'update:value': [PrefectKindJson],
  }>()

  const value = computed({
    get() {
      return props.value.value
    },
    set(value) {
      if (value?.length === 0) {
        emit('update:value', {
          __prefect_kind: 'json',
          value: undefined,
        })
        return
      }

      emit('update:value', {
        __prefect_kind: 'json',
        value,
      })
    },
  })

  const childErrors = computed(() => getAllChildSchemaPropertyErrors(props.errors))
</script>