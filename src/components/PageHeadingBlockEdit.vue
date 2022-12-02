<template>
  <page-heading class="page-heading-block-edit" :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import { BreadCrumbs } from '@prefecthq/prefect-design'
  import PageHeading from '@/components/PageHeading.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { BlockDocument } from '@/models/BlockDocument'

  const props = defineProps<{
    blockDocument: BlockDocument,
  }>()

  const routes = useWorkspaceRoutes()

  const crumbs: BreadCrumbs = [
    { text: 'Blocks', to: routes.blocks() },
    { text: props.blockDocument.name, to: routes.block(props.blockDocument.id) },
    { text: 'Edit' },
  ]
</script>