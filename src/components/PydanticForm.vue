<template>
  <p-form>
    <PydanticFormField :definition="definition" />
  </p-form>
</template>

<script lang="ts" setup>
  import PydanticFormField from './PydanticFormField.vue'
  import type { TypeDefinition } from '@/types/Pydantic'

  const props = defineProps<{
    modelValue?: Record<string, unknown>,
    definition: TypeDefinition,
  }>()
</script>