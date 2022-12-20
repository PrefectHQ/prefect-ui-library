<template>
  <p-icon-button-menu v-bind="$attrs" class="worker-pool-menu">
    <CopyOverflowMenuItem label="Copy ID" :item="workerPool.id" />
    <router-link :to="routes.workerPoolEdit(workerPool.id)">
      <p-overflow-menu-item v-if="can.update.worker_pool" label="Edit" />
    </router-link>
    <p-overflow-menu-item v-if="can.delete.worker_pool" label="Delete" @click="open" />
  </p-icon-button-menu>
  <ConfirmDeleteModal
    v-model:showModal="showModal"
    label="Worker Pool"
    :name="workerPool.name"
    @delete="deleteWorkerPool(workerPool.name)"
  />
</template>

<script lang="ts">
  export default {
    name: 'WorkerPoolMenu',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { CopyOverflowMenuItem, ConfirmDeleteModal } from '@/components'
  import { useCan, useShowModal, useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { WorkerPool } from '@/models'
  import { deleteItem } from '@/utilities'

  defineProps<{
    workerPool: WorkerPool,
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const can = useCan()
  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const { showModal, open, close } = useShowModal()

  async function deleteWorkerPool(name: string): Promise<void> {
    close()
    await deleteItem(name, api.workQueues.deleteWorkQueue, 'Work queue')
    emit('delete')
  }
</script>