<template>
  <PageHeading :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PageHeading from './PageHeading.vue'
  import { WorkQueue } from '@/models'
  import { workQueueRouteKey, workQueuesRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const props = defineProps<{
    workQueue: WorkQueue,
  }>()

  const workQueuesRoute = inject(workQueuesRouteKey)
  const workQueueRoute = inject(workQueueRouteKey)

  const crumbs = computed(() => [
    { text: 'Work Queues', to: workQueuesRoute() },
    { text: props.workQueue.name, to: workQueueRoute(props.workQueue.id) },
    { text: 'Edit' },
  ])
</script>