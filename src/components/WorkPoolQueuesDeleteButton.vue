<template>
  <Transition name="work-pool-queues-delete-button-transition">
    <p-button v-if="workPoolQueues.length > 0" danger icon="TrashIcon" @click="open" />
  </Transition>
  <ConfirmDeleteModal
    v-model:showModal="showModal"
    name="selected work queues"
    label="Work Queues"
    @delete="deleteWorkPoolQueues(workPoolQueues)"
  />
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import { useShowModal, useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { WorkPoolQueue } from '@/models'

  const props = defineProps<{
    workPoolName: string,
    workPoolQueues: WorkPoolQueue[],
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const { showModal, open, close } = useShowModal()

  const api = useWorkspaceApi()

  const deleteWorkPoolQueues = async (workPoolQueues: WorkPoolQueue[]): Promise<void> => {
    const toastMessage = computed(() => {
      if (workPoolQueues.length === 1) {
        return localization.success.delete('Work queue')
      }
      return localization.success.delete(`${workPoolQueues.length} work queues`)
    })

    try {
      const deletePromises = workPoolQueues.map((workPoolQueue) => api.workPoolQueues.deleteWorkPoolQueue(props.workPoolName, workPoolQueue.name))
      await Promise.all(deletePromises)
      showToast(toastMessage, 'success')
      emit('delete')
    } catch (error) {
      showToast(localization.error.delete('work queues'), 'error')
    } finally {
      close()
    }
  }
</script>

<style>
.work-pool-queues-delete-button-transition-enter-active,
.work-pool-queues-delete-button-transition-leave-active {
  transition: opacity 0.25s ease;
}

.work-pool-queues-delete-button-transition-enter-from,
.work-pool-queues-delete-button-transition-leave-to {
  opacity: 0;
}
</style>