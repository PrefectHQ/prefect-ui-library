<template>
  <p-icon-button-menu small class="schema-form-property-menu">
    <template v-if="!disabled">
      <p-overflow-menu-item v-if="showKind('none')" label="Use form input" @click="emit('update:kind', 'none')" />
      <p-overflow-menu-item v-if="showKind('json')" label="Use JSON input" @click="emit('update:kind', 'json')" />
      <p-overflow-menu-item v-if="showKind('workspace_variable')" label="Select variable" @click="emit('update:kind', 'workspace_variable')" />
    </template>

    <template v-if="$slots.default">
      <p-divider v-if="!disabled" class="schema-form-property-menu__divider" />
      <slot />
    </template>
  </p-icon-button-menu>
</template>

<script lang="ts" setup>
  import { PrefectKind } from '@/schemas/types/schemaValues'

  const props = defineProps<{
    kind: PrefectKind,
    disabled?: boolean,
  }>()

  const emit = defineEmits<{
    'update:kind': [PrefectKind],
  }>()

  function showKind(kind: PrefectKind): boolean {
    return props.kind !== kind
  }
</script>

<style>
.schema-form-property-menu__divider .p-divider { @apply
  m-0
}
</style>