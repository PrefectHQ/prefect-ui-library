<template>
  <page-heading class="page-heading-work-queue" :crumbs="crumbs">
    <template #actions>
      <WorkQueueToggle :work-queue="workQueue" @update="emit('update')" />
      <WorkQueueMenu :work-queue="workQueue" @delete="$emit('delete')" />
    </template>

    <template v-if="workQueue.deprecated" #default>
      <div class="page-heading-work-queue__deprecation-notice">
        <p-icon icon="ExclamationCircleIcon" class="page-heading-work-queue__deprecation-icon" />
        This work queue is deprecated; you won't be able to modify it but it will still continue to work.
      </div>
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
    workQueue: WorkQueue,
  }>()

  const workQueueRoute = inject(workQueuesRouteKey)

  const crumbs = computed(() => [
    { text: 'Work Queues', to: workQueueRoute() },
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