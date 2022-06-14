<template>
  <page-heading class="page-heading-blocks" :crumbs="crumbs">
    <template #actions>
      <router-link :to="blockEditRoute(block.id)">
        <p-overflow-menu-item label="Edit" />
      </router-link>
      <p-icon-button-menu>
        <template #default>
          <p-overflow-menu-item label="Delete" @click="open" />
        </template>
      </p-icon-button-menu>
      <ConfirmDeleteModal
        v-model:showModal="showModal"
        :name="block.name!"
        @delete="deleteBlock(block.id)"
      />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { BreadCrumbs } from '@prefecthq/prefect-design'
  import PageHeading from '@/components/PageHeading.vue'
  import { useShowModal } from '@/compositions/useShowModal'
  import { BlockDocument } from '@/models/BlockDocument'
  import { blockEditRouteKey, blocksRouteKey } from '@/router/routes'
  import { blockDocumentsApiKey } from '@/services'
  import { deleteItem, inject } from '@/utilities'

  const props = defineProps<{
    block: BlockDocument,
  }>()

  const blockRoute = inject(blocksRouteKey)
  const blockEditRoute = inject(blockEditRouteKey)
  const blockDocumentsApi = inject(blockDocumentsApiKey)

  const { showModal, open } = useShowModal()

  const crumbs: BreadCrumbs = [
    { text: 'Blocks', to: blockRoute() },
    { text: props.block.name },
  ]

  const emit = defineEmits<{
    (event: 'update' | 'delete'): void,
  }>()

  const deleteBlock = async (id: string): Promise<void> => {
    await deleteItem(id, blockDocumentsApi.deleteBlockDocument, 'Work queue')
    emit('delete')
  }
</script>