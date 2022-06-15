<template>
  <page-heading class="page-heading-block-catalog" :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import { BreadCrumbs } from '@prefecthq/prefect-design'
  import PageHeading from '@/components/PageHeading.vue'
  import { blocksRouteKey } from '@/router/routes'
  import { inject } from '@/utilities'

  const blocksRoute = inject(blocksRouteKey)

  const crumbs: BreadCrumbs = [
    { text: 'Blocks', to: blocksRoute() },
    { text: 'Choose a Block' },
  ]
</script>