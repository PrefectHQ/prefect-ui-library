<template>
  <page-heading class="page-heading-blocks" :crumbs="crumbs">
    <template #actions>
      <BlockDocumentMenu :block-document="blockDocument" @delete="emit('delete')" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { BreadCrumbs } from '@prefecthq/prefect-design'
  import BlockDocumentMenu from './BlockDocumentMenu.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { BlockDocument } from '@/models/BlockDocument'

  const props = defineProps<{
    blockDocument: BlockDocument,
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const routes = useWorkspaceRoutes()

  const crumbs: BreadCrumbs = [
    { text: 'Blocks', to: routes.blocks() },
    { text: props.blockDocument.name },
  ]
</script>