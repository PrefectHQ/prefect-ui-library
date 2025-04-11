<template>
  <p-content secondary class="schema-property-view-kind-json">
    <p-code-input :model-value="displayValue" lang="json" show-line-numbers />
  </p-content>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { isPrefectKindValue, PrefectKindJson } from '@/schemas/types/schemaValues'

  const { value = '{}' } = defineProps<{
    value: PrefectKindJson,
  }>()

  const displayValue = computed(() => {
    if (isPrefectKindValue(value, 'json')) {
      return value.value
    }

    return value
  })
</script>