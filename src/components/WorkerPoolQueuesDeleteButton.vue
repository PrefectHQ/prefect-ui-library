<template>
  <Transition name="worker-pool-queuess-delete-button-transition">
    <p-button v-if="workerPoolQueues.length > 0" danger icon="TrashIcon" @click="open" />
  </Transition>
  <ConfirmDeleteModal
    v-model:showModal="showModal"
    name="selected worker pool queues"
    label="Worker Pool Queues"
    @delete="deleteWorkerPoolQueues(workerPoolQueues)"
  />
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import { useShowModal, useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { WorkerPoolQueue } from '@/models'

  const props = defineProps<{
    workerPoolName: string,
    workerPoolQueues: WorkerPoolQueue[],
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const { showModal, open, close } = useShowModal()

  const api = useWorkspaceApi()

  const deleteWorkerPoolQueues = async (workerPoolQueues: WorkerPoolQueue[]): Promise<void> => {
    const toastMessage = computed(() => {
      if (workerPoolQueues.length === 1) {
        return localization.success.delete('Work queue')
      }
      return localization.success.delete(`${workerPoolQueues.length} worker pool queues`)
    })

    try {
      const deletePromises = workerPoolQueues.map((workerPoolQueue) => api.workerPoolQueues.deleteWorkerPoolQueue(props.workerPoolName, workerPoolQueue.name))
      await Promise.all(deletePromises)
      showToast(toastMessage, 'success')
      emit('delete')
    } catch (error) {
      showToast(localization.error.delete('worker pool queues'), 'error')
    } finally {
      close()
    }
  }
</script>

<style>
.worker-pool-queues-delete-button-transition-enter-active,
.worker-pool-queues-delete-button-transition-leave-active {
  transition: opacity 0.25s ease;
}

.worker-pool-queues-delete-button-transition-enter-from,
.worker-pool-queues-delete-button-transition-leave-to {
  opacity: 0;
}
</style>