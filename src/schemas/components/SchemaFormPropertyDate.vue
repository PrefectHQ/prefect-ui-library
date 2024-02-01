<template>
  <p-date-input v-model="value" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { SchemaProperty } from '@/schemas/types/schema'

  const props = defineProps<{
    property: SchemaProperty & { type: 'string', format: 'date' },
    value: string | null,
  }>()

  const emit = defineEmits<{
    'update:value': [string | null],
  }>()

  const value = computed({
    get() {
      return props.value
    },
    set(value) {
      emit('update:value', value)
    },
  })
</script>