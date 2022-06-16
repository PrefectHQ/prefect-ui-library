<template>
  <p-icon-button-menu v-bind="$attrs">
    <copy-overflow-menu-item label="Copy ID" :item="blockDocument.id" />
    <p-overflow-menu-item label="Edit" @click="blockEditRoute(blockDocument.id)" />
    <p-overflow-menu-item label="Delete" @click="open" />
  </p-icon-button-menu>
  <ConfirmDeleteModal
    v-model:showModal="showModal"
    :name="blockDocument.name"
    @delete="deleteBlock(blockDocument.id)"
  />
</template>

<script lang="ts">
  import { PIconButtonMenu, POverflowMenuItem } from '@prefecthq/prefect-design'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'DeploymentMenu',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import CopyOverflowMenuItem from '@/components/CopyOverflowMenuItem.vue'
  import { useShowModal } from '@/compositions/useShowModal'
  import { BlockDocument } from '@/models'
  import { blockEditRouteKey } from '@/router/routes'
  import { blockDocumentsApiKey } from '@/services/BlockDocumentsApi'
  import { inject, deleteItem } from '@/utilities'

  defineProps<{
    blockDocument: BlockDocument,
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const blockEditRoute = inject(blockEditRouteKey)
  const blockDocumentsApi = inject(blockDocumentsApiKey)
  const { showModal, open } = useShowModal()

  const deleteBlock = async (id: string): Promise<void> => {
    await deleteItem(id, blockDocumentsApi.deleteBlockDocument, 'Block')

    emit('delete')
  }
</script>