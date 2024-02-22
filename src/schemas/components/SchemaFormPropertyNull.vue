<template>
  <p class="schema-form-property-null">
    Property is type "None"
  </p>
</template>

<!-- eslint-disable vue/no-unused-properties -->
<script lang="ts" setup>
  import { SchemaProperty } from '@/schemas/types/schema'

  defineProps<{
    property: SchemaProperty & { type: 'null' },
    value: null,
  }>()

  const emit = defineEmits<{
    'update:value': [null],
  }>()

  emit('update:value', null)
</script>

<style>
.schema-form-property-null { @apply
  text-subdued
  text-sm
}
</style>