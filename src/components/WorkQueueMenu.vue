<template>
  <p-icon-button-menu v-bind="$attrs">
    <copy-overflow-menu-item label="Copy ID" :item="workQueue.id" />
    <router-link v-if="can.update.work_queue && !workQueue.deprecated" :to="editQueueRoute(workQueue.id)">
      <p-overflow-menu-item label="Edit" />
    </router-link>
    <p-overflow-menu-item v-if="can.delete.work_queue" label="Delete" @click="open" />
  </p-icon-button-menu>

  <ConfirmDeleteModal
    v-model:showModal="showModal"
    label="Work Queue"
    :name="workQueue.name"
    @delete="deleteWorkQueue(workQueue.id)"
  />
</template>

<script lang="ts">
  export default {
    name: 'WorkQueueMenu',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { PIconButtonMenu, POverflowMenuItem } from '@prefecthq/prefect-design'
  import { RouterLink } from 'vue-router'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import CopyOverflowMenuItem from '@/components/CopyOverflowMenuItem.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { WorkQueue } from '@/models'
  import { editQueueRouteKey } from '@/router'
  import { inject, deleteItem } from '@/utilities'

  defineProps<{
    workQueue: WorkQueue,
  }>()

  const emits = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const api = useWorkspaceApi()
  const { showModal, open, close } = useShowModal()

  const editQueueRoute = inject(editQueueRouteKey)
  const can = useCan()

  const deleteWorkQueue = async (id: string): Promise<void> => {
    close()
    await deleteItem(id, api.workQueues.deleteWorkQueue, 'Work queue')
    emits('delete', id)
  }
</script>