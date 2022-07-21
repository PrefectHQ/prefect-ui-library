<template>
  <page-heading class="page-heading-blocks" :crumbs="crumbs">
    <template #actions>
      <BlockDocumentMenu :block-document="blockDocument" @delete="$emit('delete')" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { BreadCrumbs } from '@prefecthq/prefect-design'
  import BlockDocumentMenu from './BlockDocumentMenu.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { BlockDocument } from '@/models/BlockDocument'
  import { blocksRouteKey } from '@/router/routes'
  import { inject } from '@/utilities'

  const props = defineProps<{
    blockDocument: BlockDocument,
  }>()

  const blocksRoute = inject(blocksRouteKey)

  defineEmits<{
    (event: 'delete'): void,
  }>()

  const crumbs: BreadCrumbs = [
    { text: 'Blocks', to: blocksRoute() },
    { text: props.blockDocument.name },
  ]
</script>