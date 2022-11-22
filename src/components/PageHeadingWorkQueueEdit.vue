<template>
  <PageHeading :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PageHeading from './PageHeading.vue'
  import { WorkQueue } from '@/models'
  import { useWorkspaceRoutes } from '@/router'

  const props = defineProps<{
    workQueue: WorkQueue,
  }>()

  const routes = useWorkspaceRoutes()

  const crumbs = computed(() => [
    { text: 'Work Queues', to: routes.workQueues() },
    { text: props.workQueue.name, to: routes.workQueue(props.workQueue.id) },
    { text: 'Edit' },
  ])
</script>