<template>
  <p-toggle :model-value="value" disabled />
</template>

<script lang="ts" setup>
  import { SchemaProperty } from '@/schemas/types/schema'

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { property, value = false } = defineProps<{
    property: SchemaProperty & { type: 'boolean' },
    value: boolean | undefined,
  }>()
</script>