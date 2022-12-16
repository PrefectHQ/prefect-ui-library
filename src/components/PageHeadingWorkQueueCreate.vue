<template>
  <PageHeading :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'
  import { useWorkspaceRoutes } from '@/compositions'

  const routes = useWorkspaceRoutes()

  const crumbs = [
    { text: 'Work Queues', to: routes.workQueues() },
    { text: 'Create' },
  ]
</script>