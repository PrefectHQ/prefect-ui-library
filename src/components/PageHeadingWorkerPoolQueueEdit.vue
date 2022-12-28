<template>
  <PageHeading :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    workerPoolName: string,
    workerPoolQueueName: string,
  }>()

  const routes = useWorkspaceRoutes()

  const crumbs = computed(() => [
    { text: 'Worker Pools', to: routes.workerPools() },
    { text: props.workerPoolName, to: routes.workerPool(props.workerPoolName) },
    { text: props.workerPoolQueueName, to: routes.workerPoolQueue(props.workerPoolName, props.workerPoolQueueName) },
    { text: 'Edit' },
  ])
</script>