<template>
  <p-icon-button-menu v-bind="$attrs">
    <copy-overflow-menu-item label="Copy Name" :item="blockDocument.name" />
    <p-overflow-menu-item v-if="can.update.block" label="Edit" @click="editBlock" />
    <p-overflow-menu-item v-if="can.delete.block" label="Delete" @click="openDeleteBlockModal" />
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
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { BlockDocument } from '@/models'
  import { blockEditRouteKey } from '@/router/routes'
  import { blockDocumentsApiKey } from '@/services/BlockDocumentsApi'
  import { inject, deleteItem } from '@/utilities'

  const props = defineProps<{
    blockDocument: BlockDocument,
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const can = useCan()
  const router = useRouter()
  const blockEditRoute = inject(blockEditRouteKey)
  const blockDocumentsApi = inject(blockDocumentsApiKey)
  const { showModal, open: openDeleteBlockModal } = useShowModal()

  function editBlock(): void {
    router.push(blockEditRoute(props.blockDocument.id))
  }

  async function deleteBlock(id: string): Promise<void> {
    await deleteItem(id, blockDocumentsApi.deleteBlockDocument, 'Block')

    emit('delete')
  }
</script>