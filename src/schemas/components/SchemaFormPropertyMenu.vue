<template>
  <p-icon-button-menu small flat class="schema-form-property-menu">
    <p-overflow-menu-item v-if="showKind('json')" label="Use JSON input" @click="emit('update:kind', 'json')" />
    <p-overflow-menu-item v-if="showKind('none')" label="Use form input" @click="emit('update:kind', 'none')" />
  </p-icon-button-menu>
</template>

<script lang="ts" setup>
  import { PrefectKind } from '@/schemas/types/schemaValues'

  const props = defineProps<{
    kind: PrefectKind,
  }>()

  const emit = defineEmits<{
    'update:kind': [PrefectKind],
  }>()

  function showKind(kind: PrefectKind): boolean {
    return props.kind !== kind
  }
</script>