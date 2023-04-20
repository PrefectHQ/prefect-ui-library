<template>
  <JsonInput v-model="stringifiedOverrides" show-format-button />
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import JsonInput from '@/components/JsonInput.vue'

  const props = defineProps<{
    infrastructureOverrides: Record<string, unknown>,
  }>()

  const emit = defineEmits<{
    (event: 'update', value: Record<string, unknown>): void,
  }>()

  const stringifiedOverrides = computed({
    get() {
      return JSON.stringify(props.infrastructureOverrides)
    },
    set() {
      emit('update', JSON.parse(stringifiedOverrides.value))
    },
  })
</script>