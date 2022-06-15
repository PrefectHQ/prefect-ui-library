<template>
  <page-heading class="page-heading-block-catalog-create" :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import { BreadCrumbs } from '@prefecthq/prefect-design'
  import PageHeading from '@/components/PageHeading.vue'
  import { BlockType } from '@/models/BlockType'
  import { blocksRouteKey, blockCatalogRouteKey } from '@/router/routes'
  import { inject } from '@/utilities'

  const props = defineProps<{
    blockType: BlockType,
  }>()

  const blocksRoute = inject(blocksRouteKey)
  const blockCatalogRoute = inject(blockCatalogRouteKey)

  const crumbs: BreadCrumbs = [
    { text: 'Blocks', to: blocksRoute() },
    { text: 'Choose a Block', to: blockCatalogRoute() },
    { text: props.blockType.name },
  ]
</script>