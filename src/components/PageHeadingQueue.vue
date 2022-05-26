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
  import { PIconButtonMenu, showToast } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import CopyOverflowMenuItem from './CopyOverflowMenuItem.vue'
  import DeleteOverflowMenuItem from './DeleteOverflowMenuItem.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import WorkQueueToggle from '@/components/WorkQueueToggle.vue'
  import { WorkQueue } from '@/models'
  import { workQueuesApiKey } from '@/services/WorkQueuesApi'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    queue: WorkQueue,
  }>()

  const workQueuesApi = inject(workQueuesApiKey)

  const crumbs = computed(() => [{ text: props.queue.name }])

  const emit = defineEmits(['refresh'])

  const deleteWorkQueue = async (id: string): Promise<void> => {
    try {
      await workQueuesApi.deleteWorkQueue(id)
      showToast('Work queue deleted successfully!', 'success', undefined, 3000)
      emit('refresh')
    } catch (error) {
      showToast('Failed to delete work queue', 'error', undefined, 3000)
      console.error(error)
    }
  }
</script>