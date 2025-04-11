<template>
  <p-content secondary class="schema-property-view-kind-jinja">
    <p-code-input :model-value="displayValue" lang="jinja" show-line-numbers />
  </p-content>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { isPrefectKindValue, PrefectKindJinja } from '@/schemas/types/schemaValues'

  const { value = '' } = defineProps<{
    value: PrefectKindJinja,
  }>()

  const displayValue = computed(() => {
    if (isPrefectKindValue(value, 'jinja')) {
      return value.template
    }

    return value
  })
</script>