<template>
  <p-content>
    <page-heading class="page-heading-blocks-catalog" :crumbs="crumbs" />

    <p-message>
      Can't find a block for your service? Check our
      <p-link :to="localization.docs.collections">
        docs
      </p-link>
      for a full list of integrations in the SDK.
    </p-message>
  </p-content>
</template>

<script lang="ts" setup>
  import { BreadCrumbs } from '@prefecthq/prefect-design'
  import PageHeading from '@/components/PageHeading.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'

  const routes = useWorkspaceRoutes()

  const crumbs: BreadCrumbs = [
    { text: 'Blocks', to: routes.blocks() },
    { text: 'Catalog' },
  ]
</script>
