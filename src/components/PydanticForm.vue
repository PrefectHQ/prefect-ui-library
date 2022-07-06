<template>
  <p-form />
</template>

<script lang="ts" setup>
  import type { TypeDefinition } from '@/types/Pydantic'

  const props = defineProps<{
    modelValue?: Record<string, unknown>,
    definition: TypeDefinition,
  }>()
</script>