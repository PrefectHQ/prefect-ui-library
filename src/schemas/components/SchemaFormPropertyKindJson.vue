<template>
  <p-code-input v-model="value" lang="json" class="schema-form-property-kind-json" show-line-numbers />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { PrefectKindJson } from '@/schemas/types/schemaValues'

  const props = defineProps<{
    value: PrefectKindJson,
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