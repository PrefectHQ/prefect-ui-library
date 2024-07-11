<template>
  <p-empty-state>
    <template #icon>
      <p-icon icon="VariableIcon" class="variables-page-empty-state__icon" />
    </template>

    <template #heading>
      Add a variable to get started
    </template>

    <template #description>
      Variables store non-sensitive pieces of JSON.
    </template>
    <template #actions>
      <p-button v-if="can.create.variable" primary icon-append="PlusIcon" @click="open">
        Add Variable
      </p-button>

      <DocumentationButton :to="localization.docs.variables" />

      <VariableCreateModal v-model:show-modal="showModal" @create="emit('create')" />
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PButton, PIcon } from '@prefecthq/prefect-design'
  import DocumentationButton from '@/components/DocumentationButton.vue'
  import VariableCreateModal from '@/components/VariableCreateModal.vue'
  import { useShowModal } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { localization } from '@/localization'

  const emit = defineEmits<{
    (event: 'create'): void,
  }>()

  const can = useCan()
  const { showModal, open } = useShowModal()
</script>

<style>
.variables-page-empty-state__icon { @apply
  w-12
  h-12;
}
</style>