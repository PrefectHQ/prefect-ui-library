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
    block: BlockDocument,
  }>()

  const blocksRoute = inject(blocksRouteKey)
  const blockRoute = inject(blockRouteKey)

  const crumbs: BreadCrumbs = [
    { text: 'Blocks', to: blocksRoute() },
    { text: props.block.name, to: blockRoute(props.block.id) },
    { text: 'Edit' },
  ]
</script>