<template>
  <p-icon-button-menu size="xs">
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

<script lang="ts">
  import { PIconButtonMenu, POverflowMenuItem } from '@prefecthq/prefect-design'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'QueueMenu',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import CopyOverflowMenuItem from '@/components/CopyOverflowMenuItem.vue'
  import { useShowModal } from '@/compositions/useShowModal'
  import { WorkQueue } from '@/models'
  import { editQueueRouteKey } from '@/router'
  import { workQueuesApiKey } from '@/services/WorkQueuesApi'
  import { inject, deleteItem } from '@/utilities'

  defineProps<{
    queue: WorkQueue,
  }>()

  const emits = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const { showModal, open, close } = useShowModal()

  const workQueuesApi = inject(workQueuesApiKey)
  const editQueueRoute = inject(editQueueRouteKey)

  const deleteWorkQueue = async (id: string): Promise<void> => {
    close()
    await deleteItem(id, workQueuesApi.deleteWorkQueue, 'Work queue')
    emits('delete', id)
  }
</script>