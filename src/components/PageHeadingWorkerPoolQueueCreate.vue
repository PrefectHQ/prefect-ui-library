<template>
  <PageHeading :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'
  import { useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    workerPoolName: string,
  }>()

  const routes = useWorkspaceRoutes()


  const crumbs = [
    { text: 'Worker Pools', to: routes.workerPools() },
    { text: props.workerPoolName, to: routes.workerPool(props.workerPoolName) },
    { text: 'Create' },
  ]
</script>