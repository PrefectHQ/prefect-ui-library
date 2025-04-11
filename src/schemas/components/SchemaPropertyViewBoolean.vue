<template>
  <p-toggle :model-value="value" disabled />
</template>

<script lang="ts" setup>
  import { SchemaProperty } from '@/schemas/types/schema'
  import { asType } from '@/utilities/types'

  const { property, value = asType(property.default, Boolean) ?? false } = defineProps<{
    property: SchemaProperty & { type: 'boolean' },
    value: boolean | undefined,
  }>()
</script>