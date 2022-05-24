<template>
  <page-heading class="page-heading-queue" :crumbs="crumbs">
    <template #actions>
      <WorkQueueToggle :work-queue="queue" />

      <p-icon-button-menu>
        <template #default="{ close }">
          <copy-overflow-menu-item label="Copy ID" :close="close" :item="queue.id" />
          <p-overflow-menu-item label="Edit" />
          <p-overflow-menu-item label="Delete" />
        </template>
      </p-icon-button-menu>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { PIconButtonMenu } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import CopyOverflowMenuItem from './CopyOverflowMenuItem.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import WorkQueueToggle from '@/components/WorkQueueToggle.vue'
  import { WorkQueue } from '@/models'

  const props = defineProps<{
    queue: WorkQueue,
  }>()

  const crumbs = computed(() => [{ text: props.queue.name }])
</script>