<template>
  <page-heading class="page-heading-queue" :crumbs="crumbs">
    <template #actions>
      <WorkQueueToggle :work-queue="queue" @update="emit('update')" />

      <p-icon-button-menu>
        <copy-overflow-menu-item label="Copy ID" :item="queue.id" />
        <router-link :to="editQueueRoute(queue.id)">
          <p-overflow-menu-item label="Edit" />
        </router-link>
        <p-overflow-menu-item label="Delete" @click="open" />
      </p-icon-button-menu>
      <ConfirmDeleteModal
        v-model:showModal="showModal"
        :name="queue.name"
        @delete="deleteWorkQueue(queue.id)"
      />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { PIconButtonMenu } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import CopyOverflowMenuItem from '@/components/CopyOverflowMenuItem.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import WorkQueueToggle from '@/components/WorkQueueToggle.vue'
  import { useShowModal } from '@/compositions/useShowModal'
  import { WorkQueue } from '@/models'
  import { editQueueRouteKey } from '@/router/routes'
  import { workQueuesApiKey } from '@/services/WorkQueuesApi'
  import { deleteItem, inject } from '@/utilities'

  const props = defineProps<{
    queue: WorkQueue,
  }>()

  const editQueueRoute = inject(editQueueRouteKey)
  const workQueuesApi = inject(workQueuesApiKey)

  const { showModal, open } = useShowModal()

  const crumbs = computed(() => [{ text: props.queue.name }])

  const emit = defineEmits<{
    (event: 'update' | 'delete'): void,
  }>()

  const deleteWorkQueue = async (id: string): Promise<void> => {
    await deleteItem(id, workQueuesApi.deleteWorkQueue, 'Work queue')
    emit('delete')
  }
</script>