<template>
  <page-heading class="page-heading-blocks-catalog-create" :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import { BreadCrumbs } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { BlockType } from '@/models/BlockType'
  import { useWorkspaceRoutes } from '@/router'

  const props = defineProps<{
    blockType: BlockType,
  }>()

  const routes = useWorkspaceRoutes()

  const crumbs = computed<BreadCrumbs>(() => [
    { text: 'Blocks', to: routes.blocks() },
    { text: 'Choose a Block', to: routes.blocksCatalog() },
    { text: props.blockType.name },
  ])
</script>