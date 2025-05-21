<template>
  <p-icon-button-menu v-bind="$attrs">
    <CopyOverflowMenuItem label="Copy ID" :item="worker.id" />
    <p-overflow-menu-item label="Delete" @click="open" />
  </p-icon-button-menu>

  <ConfirmDeleteModal
    v-model:showModal="showModal"
    label="Worker"
    :name="worker.name"
    @delete="deleteWorker(worker.name)"
  />
</template>

<script lang="ts" setup>
  import { CopyOverflowMenuItem, ConfirmDeleteModal } from '@/components'
  import { useWorkspaceApi, useShowModal } from '@/compositions'
  import { WorkPoolWorker } from '@/models'
  import { deleteItem } from '@/utilities'


  defineOptions({
    inheritAttrs: false,
  })

  const props = defineProps<{
    workPoolName: string,
    worker: WorkPoolWorker,
  }>()

  const emit = defineEmits<{
    'delete': [void],
  }>()

  const api = useWorkspaceApi()
  const { showModal, open, close } = useShowModal()

  async function deleteWorker(workerName: string): Promise<void> {
    close()
    await deleteItem({ 'workPoolName': props.workPoolName, 'workerName': workerName }, api.workPoolWorkers.deleteWorker, 'Worker')
    emit('delete')
  }
</script>
