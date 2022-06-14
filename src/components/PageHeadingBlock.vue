<template>
  <page-heading class="page-heading-blocks" :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import { BreadCrumbs } from '@prefecthq/prefect-design'
  import PageHeading from '@/components/PageHeading.vue'
  import { BlockDocument } from '@/models/BlockDocument'
  import { blocksRouteKey } from '@/router/routes'
  import { inject } from '@/utilities'

  const props = defineProps<{
    block: BlockDocument,
  }>()

  const blockRoute = inject(blocksRouteKey)

  const crumbs: BreadCrumbs = [
    { text: 'Blocks', to: blockRoute() },
    { text: props.block.name },
  ]
</script>