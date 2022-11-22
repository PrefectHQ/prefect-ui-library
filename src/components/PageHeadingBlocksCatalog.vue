<template>
  <page-heading class="page-heading-blocks-catalog" :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import { BreadCrumbs } from '@prefecthq/prefect-design'
  import PageHeading from '@/components/PageHeading.vue'
  import { useWorkspaceRoutes } from '@/router'

  const routes = useWorkspaceRoutes()

  const crumbs: BreadCrumbs = [
    { text: 'Blocks', to: routes.blocks() },
    { text: 'Choose a Block' },
  ]
</script>