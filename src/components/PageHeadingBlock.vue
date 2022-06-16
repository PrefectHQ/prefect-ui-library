<template>
  <page-heading class="page-heading-blocks" :crumbs="crumbs">
    <template #actions>
      <p-icon-button-menu>
        <router-link :to="blockEditRoute(blockDocument.id)">
          <p-overflow-menu-item label="Edit" />
        </router-link>
        <p-overflow-menu-item label="Delete" @click="open" />
      </p-icon-button-menu>
      <ConfirmDeleteModal
        v-model:showModal="showModal"
        :name="blockDocument.name!"
        @delete="deleteBlock(blockDocument.id)"
      />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { BreadCrumbs } from '@prefecthq/prefect-design'
  import { useRouter } from 'vue-router'
  import ConfirmDeleteModal from './ConfirmDeleteModal.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { useShowModal } from '@/compositions/useShowModal'
  import { BlockDocument } from '@/models/BlockDocument'
  import { blockEditRouteKey, blocksRouteKey } from '@/router/routes'
  import { blockDocumentsApiKey } from '@/services'
  import { deleteItem, inject } from '@/utilities'

  const props = defineProps<{
    blockDocument: BlockDocument,
  }>()

  const blocksRoute = inject(blocksRouteKey)
  const blockEditRoute = inject(blockEditRouteKey)
  const blockDocumentsApi = inject(blockDocumentsApiKey)
  const router = useRouter()

  const { showModal, open } = useShowModal()

  const crumbs: BreadCrumbs = [
    { text: 'Blocks', to: blocksRoute() },
    { text: props.blockDocument.name },
  ]

  const deleteBlock = async (id: string): Promise<void> => {
    await deleteItem(id, blockDocumentsApi.deleteBlockDocument, 'Block')

    router.push(blocksRoute())
  }
</script>