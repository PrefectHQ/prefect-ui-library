<template>
  <page-heading class="page-heading-work-queue" :crumbs="crumbs">
    <template #actions>
      <WorkQueueToggle :work-queue="queue" @update="emit('update')" />
      <WorkQueueMenu :queue="queue" @delete="$emit('delete')" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import WorkQueueMenu from './WorkQueueMenu.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import WorkQueueToggle from '@/components/WorkQueueToggle.vue'
  import { WorkQueue } from '@/models'
  import { workQueuesRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const props = defineProps<{
    queue: WorkQueue,
  }>()

  const workQueueRoute = inject(workQueuesRouteKey)

  const crumbs = computed(() => [
    { text: 'Work Queues', to: workQueueRoute() },
    { text: props.queue.name },
  ])

  const emit = defineEmits<{
    (event: 'update' | 'delete'): void,
  }>()
</script>