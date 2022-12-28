<template>
  <p-icon-button-menu v-bind="$attrs" class="worker-pool-queue-menu">
    <CopyOverflowMenuItem label="Copy ID" :item="workerPoolQueue.id" />
    <router-link :to="routes.workerPoolQueueEdit(workerPoolName, workerPoolQueue.name)">
      <p-overflow-menu-item v-if="can.update.worker_pool_queue" label="Edit" />
    </router-link>
    <p-overflow-menu-item v-if="can.delete.worker_pool_queue" label="Delete" @click="open" />
  </p-icon-button-menu>
  <ConfirmDeleteModal
    v-model:showModal="showModal"
    label="Worker Pool Queue"
    :name="workerPoolQueue.name"
    @delete="deleteWorkerPoolQueue(workerPoolQueue.name)"
  />
</template>

<script lang="ts">
  export default {
    name: 'WorkerPoolQueueMenu',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { CopyOverflowMenuItem, ConfirmDeleteModal } from '@/components'
  import { useCan, useShowModal, useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { WorkerPoolQueue } from '@/models'
  import { deleteItem } from '@/utilities'

  const props = defineProps<{
    workerPoolName: string,
    workerPoolQueue: WorkerPoolQueue,
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const can = useCan()
  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const { showModal, open, close } = useShowModal()

  async function deleteWorkerPoolQueue(name: string): Promise<void> {
    close()
    await deleteItem([props.workerPoolName, name], api.workerPoolQueues.deleteWorkerPoolQueue, 'Worker pool queue')
    emit('delete')
  }
</script>