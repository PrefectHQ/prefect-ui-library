<template>
  <page-heading class="page-heading-blocks-catalog" :crumbs="crumbs" />
  <p-message class="page-heading-blocks-catalog__message">
    If you don't see a block for the service you're using, check out our
    <p-link :to="localization.docs.collections">
      Collections Catalog
    </p-link>
    to view a list of integrations and their corresponding blocks.
  </p-message>
</template>

<script lang="ts" setup>
  import { BreadCrumbs } from '@prefecthq/prefect-design'
  import PageHeading from '@/components/PageHeading.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'

  const routes = useWorkspaceRoutes()

  const crumbs: BreadCrumbs = [
    { text: 'Blocks', to: routes.blocks() },
    { text: 'Choose a Block' },
  ]
</script>

<style>
.page-heading-blocks-catalog__message {
  @apply
  pl-0
}
</style>