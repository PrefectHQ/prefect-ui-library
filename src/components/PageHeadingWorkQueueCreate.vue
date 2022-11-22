<template>
  <PageHeading :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import PageHeading from './PageHeading.vue'
  import { useWorkspaceRoutes } from '@/router'

  const routes = useWorkspaceRoutes()

  const crumbs = [
    { text: 'Work Queues', to: routes.workQueues() },
    { text: 'Create' },
  ]
</script>