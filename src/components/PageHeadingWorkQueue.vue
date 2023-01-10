<template>
  <page-heading class="page-heading-work-queue" :crumbs="crumbs">
    <template #actions>
      <WorkQueueToggle :work-queue="workQueue" @update="emit('update')" />
      <WorkQueueMenu :work-queue="workQueue" @delete="$emit('delete')" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PageHeading from '@/components/PageHeading.vue'
  import WorkQueueToggle from '@/components/WorkQueueToggle.vue'
  import { useComponent, useWorkspaceRoutes } from '@/compositions'
  import { WorkQueue } from '@/models'

  const props = defineProps<{
    workQueue: WorkQueue,
  }>()

  const { WorkQueueMenu } = useComponent()
  const routes = useWorkspaceRoutes()

  const crumbs = computed(() => [
    { text: 'Work Queues', to: routes.workQueues() },
    { text: props.workQueue.name },
  ])

  const emit = defineEmits<{
    (event: 'update' | 'delete'): void,
  }>()
</script>

<style>
.page-heading-work-queue__deprecation-notice { @apply
  text-sm
}

.page-heading-work-queue__deprecation-icon { @apply
  inline
}
</style>