<template>
  <page-heading class="page-heading-queue" :crumbs="crumbs">
    <template #actions>
      <WorkQueueToggle :work-queue="queue" />

      <p-icon-button-menu>
        <template #default="{ close }">
          <copy-overflow-menu-item label="Copy ID" :item="queue.id" @click="close" />
          <p-overflow-menu-item label="Edit" />
          <delete-overflow-menu-item :name="queue.name" @remove="deleteWorkQueue(queue.id)" />
        </template>
      </p-icon-button-menu>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { PIconButtonMenu } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import CopyOverflowMenuItem from './CopyOverflowMenuItem.vue'
  import DeleteOverflowMenuItem from './DeleteOverflowMenuItem.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import WorkQueueToggle from '@/components/WorkQueueToggle.vue'
  import { WorkQueue } from '@/models'
  import { deleteItem } from '@/utilities'

  const props = defineProps<{
    queue: WorkQueue,
  }>()

  const crumbs = computed(() => [{ text: props.queue.name }])

  const emit = defineEmits(['refresh'])

  const deleteWorkQueue = (id: string): void => {
    deleteItem(id, 'Work queue')
    emit('refresh')
  }
</script>