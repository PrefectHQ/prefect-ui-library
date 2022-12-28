<template>
  <p-icon-button-menu v-bind="$attrs" class="worker-pool-menu">
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
    @delete="deleteWorkerPool(workerPoolQueue.name)"
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
  import { showToast } from '@prefecthq/prefect-design'
  import { CopyOverflowMenuItem, ConfirmDeleteModal } from '@/components'
  import { useCan, useShowModal, useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { WorkerPoolQueue } from '@/models'

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

  async function deleteWorkerPool(name: string): Promise<void> {
    try {
      await api.workerPoolQueues.deleteWorkerPoolQueue(props.workerPoolName, props.workerPoolQueue.name)

      showToast(localization.success.delete('Worker Pool Queue'), 'success')
    } catch (error) {
      showToast(localization.error.delete('worker pool queue'), 'error')

      console.error(error)
    } finally {
      close()
      emit('delete')
    }
  }
</script>