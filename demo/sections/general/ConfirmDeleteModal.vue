<template>
  <ComponentPage title="ConfirmDeleteModal" :demos="demos">
    <ConfirmDeleteModal v-model:showModal="showModal" label="foo" name="bar" />
    <p-button danger @click="openDeleteModal">
      Delete
    </p-button>

    <template #with-slot>
      <ConfirmDeleteModalWithSlot label="foo" name="bar">
        <template #default="{ open }">
          <p-button danger @click="open">
            Delete
          </p-button>
        </template>
      </ConfirmDeleteModalWithSlot>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import ConfirmDeleteModalWithSlot from '@/components/ConfirmDeleteModalWithSlot.vue'
  import { useShowModal } from '@/compositions'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [{ title: 'With Slot' }]
  const { showModal, open: openDeleteModal } = useShowModal()
</script>