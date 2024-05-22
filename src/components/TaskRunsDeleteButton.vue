<template>
  <Transition name="task-runs-delete-button-transition">
    <p-button v-if="selected.length > 0" icon="TrashIcon" small @click="open" />
  </Transition>
  <ConfirmDeleteModal
    v-model:showModal="showModal"
    name="selected task runs"
    label="Task runs"
    @delete="() => deleteTaskRuns(selected)"
  />
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import { useShowModal, useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { getApiErrorMessage } from '@/utilities/errors'

  defineProps<{
    selected: string[],
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const { showModal, open, close } = useShowModal()

  const api = useWorkspaceApi()

  const deleteTaskRuns = async (taskRunIds: string[]): Promise<void> => {
    const toastMessage = computed(() => {
      if (taskRunIds.length === 1) {
        return 'Task run deleted'
      }
      return `${taskRunIds.length} flow runs deleted`
    })

    close()

    try {
      const deleteTaskRuns = taskRunIds.map(api.taskRuns.deleteTaskRun)
      await Promise.all(deleteTaskRuns)

      showToast(toastMessage, 'success')
      emit('delete')
    } catch (error) {
      const message = getApiErrorMessage(error, localization.error.delete('Task run'))
      showToast(message, 'error')
    }
  }
</script>

<style>
.task-runs-delete-button-transition-enter-active,
.task-runs-delete-button-transition-leave-active {
  transition: opacity 0.25s ease;
}

.task-runs-delete-button-transition-enter-from,
.task-runs-delete-button-transition-leave-to {
  opacity: 0;
}
</style>