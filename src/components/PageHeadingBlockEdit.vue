<template>
  <page-heading class="page-heading-block-edit" :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import { BreadCrumbs } from '@prefecthq/prefect-design'
  import PageHeading from '@/components/PageHeading.vue'
  import { BlockDocument } from '@/models/BlockDocument'
  import { blocksRouteKey, blockRouteKey } from '@/router/routes'
  import { inject } from '@/utilities'

  const props = defineProps<{
    blockDocument: BlockDocument,
  }>()

  const blocksRoute = inject(blocksRouteKey)
  const blockRoute = inject(blockRouteKey)

  const crumbs: BreadCrumbs = [
    { text: 'Blocks', to: blocksRoute() },
    { text: props.blockDocument.name, to: blockRoute(props.blockDocument.id) },
    { text: 'Edit' },
  ]
</script>