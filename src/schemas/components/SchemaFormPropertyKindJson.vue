<template>
  <p-code-input v-model="value" lang="json" :state="state" class="schema-form-property-kind-json" show-line-numbers />
</template>

<script lang="ts" setup>
  import { State } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { PrefectKindJson } from '@/schemas/types/schemaValues'
  import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'

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
</script>