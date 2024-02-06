<template>
  <WorkspaceVariableCombobox v-model:selected="value" class="schema-form-property-kind-workspace-variable" />
</template>

<script lang="ts" setup>
  /* eslint-disable camelcase */
  import { computed } from 'vue'
  import WorkspaceVariableCombobox from '@/components/WorkspaceVariableCombobox.vue'
  import { PrefectKindWorkspaceVariable } from '@/schemas/types/schemaValues'

  const props = defineProps<{
    value: PrefectKindWorkspaceVariable,
  }>()

  const emit = defineEmits<{
    'update:value': [PrefectKindWorkspaceVariable],
  }>()

  const value = computed({
    get() {
      return props.value.variable_name
    },
    set(variable_name) {
      emit('update:value', {
        __prefect_kind: 'workspace_variable',
        variable_name,
      })
    },
  })
</script>