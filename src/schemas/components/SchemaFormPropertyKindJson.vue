<template>
  <p-code-input v-model="value" lang="json" :state="state" class="schema-form-property-kind-json" show-line-numbers />
  <SchemaFormPropertyErrors :errors="errors" />
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
      emit('update:value', {
        __prefect_kind: 'json',
        value,
      })
    },
  })

  const errors = computed(() => getAllChildSchemaPropertyErrors(props.errors))
</script>

<style>
.schema-form-property-kind-json__errors { @apply
  text-invalid
  text-sm
}
</style>