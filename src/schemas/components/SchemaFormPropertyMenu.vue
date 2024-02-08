<template>
  <p-icon-button-menu v-if="showMenu" small class="schema-form-property-menu">
    <template v-if="!disabled">
      <p-overflow-menu-item v-if="showKind('none')" label="Use form input" @click="emit('update:kind', 'none')" />
      <p-overflow-menu-item v-if="showKind('json')" label="Use JSON input" @click="emit('update:kind', 'json')" />
      <p-overflow-menu-item v-if="showKind('workspace_variable')" label="Select variable" @click="emit('update:kind', 'workspace_variable')" />
      <p-overflow-menu-item v-if="showKind('jinja')" label="Create a template" @click="emit('update:kind', 'jinja')" />
    </template>

    <template v-if="slots.default">
      <p-divider v-if="showDivider" class="schema-form-property-menu__divider" />
      <slot />
    </template>
  </p-icon-button-menu>
</template>

<script lang="ts" setup>
  import { computed, useSlots } from 'vue'
  import { useSchemaFormKinds } from '@/schemas/compositions/useSchemaFormKinds'
  import { PrefectKind } from '@/schemas/types/schemaValues'

  const props = defineProps<{
    kind: PrefectKind,
    disabled?: boolean,
  }>()

  const emit = defineEmits<{
    'update:kind': [PrefectKind],
  }>()

  const slots = useSlots()
  const kinds = useSchemaFormKinds()

  const showMenu = computed(() => kinds.length || slots.default)
  const showDivider = computed(() => !props.disabled && kinds.length)

  function showKind(kind: PrefectKind): boolean {
    return props.kind !== kind && (kinds.includes(kind) || kind === 'none')
  }
</script>

<style>
.schema-form-property-menu__divider .p-divider { @apply
  m-0
}
</style>