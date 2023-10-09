<template>
  <p-icon-button-menu v-bind="$attrs">
    <copy-overflow-menu-item label="Copy Name" :item="blockDocument.name" />
    <p-overflow-menu-item v-if="blockDocument.can.update" label="Edit" @click="editBlock" />
    <p-overflow-menu-item v-if="blockDocument.can.delete" label="Delete" @click="openDeleteBlockModal" />

    <slot v-bind="{ blockDocument }" />
  </p-icon-button-menu>

  <ConfirmDeleteModal
    v-model:showModal="showModal"
    label="Block"
    :name="blockDocument.name"
    @delete="deleteBlock(blockDocument.id)"
  />
</template>

<script lang="ts">
  export default {
    name: 'BlockDocumentMenu',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { PIconButtonMenu, POverflowMenuItem } from '@prefecthq/prefect-design'
  import { useRouter } from 'vue-router'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import CopyOverflowMenuItem from '@/components/CopyOverflowMenuItem.vue'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { useShowModal } from '@/compositions/useShowModal'
  import { BlockDocument } from '@/models'
  import { deleteItem } from '@/utilities'

  const props = defineProps<{
    blockDocument: BlockDocument,
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const router = useRouter()
  const routes = useWorkspaceRoutes()
  const api = useWorkspaceApi()
  const { showModal, open: openDeleteBlockModal } = useShowModal()

  function editBlock(): void {
    router.push(routes.blockEdit(props.blockDocument.id))
  }

  async function deleteBlock(id: string): Promise<void> {
    await deleteItem(id, api.blockDocuments.deleteBlockDocument, 'Block')

    emit('delete')
  }
</script>