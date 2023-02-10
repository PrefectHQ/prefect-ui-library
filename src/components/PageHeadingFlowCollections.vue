<template>
  <page-heading class="page-heading-flow-collections" :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'
  import { useWorkspaceRoutes } from '@/compositions'

  const routes = useWorkspaceRoutes()

  const crumbs = [
    { text: 'Flows', to: routes.flows() },
    { text: 'Collections' },
  ]
</script>