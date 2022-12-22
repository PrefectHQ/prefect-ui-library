<template>
  <PageHeading :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { WorkerPool } from '@/models'

  const props = defineProps<{
    workerPool: WorkerPool,
  }>()

  const routes = useWorkspaceRoutes()

  const crumbs = computed(() => [
    { text: 'Worker Pools', to: routes.workerPools() },
    { text: props.workerPool.name, to: routes.workerPool(props.workerPool.name) },
    { text: 'Edit' },
  ])
</script>