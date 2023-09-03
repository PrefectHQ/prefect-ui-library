<template>
  <Transition name="flow-runs-delete-button-transition">
    <p-button v-if="selected.length > 0" dangerous icon="TrashIcon" @click="open" />
  </Transition>
  <ConfirmDeleteModal
    v-model:showModal="showModal"
    name="selected flow runs"
    label="Flow Runs"
    @delete="deleteFlowRuns(selected)"
  />
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import { useShowModal, useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { getErrorMessage } from '@/utilities/errors'

  defineProps<{
    selected: string[],
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const { showModal, open, close } = useShowModal()

  const api = useWorkspaceApi()

  const deleteFlowRuns = async (flowRuns: string[]): Promise<void> => {
    const toastMessage = computed(() => {
      if (flowRuns.length === 1) {
        return 'Flow run deleted'
      }
      return `${flowRuns.length} flow runs deleted`
    })

    close()

    try {
      const deleteFlowRuns = flowRuns.map(api.flowRuns.deleteFlowRun)
      await Promise.all(deleteFlowRuns)

      showToast(toastMessage, 'success')
      emit('delete')
    } catch (error) {
      const errMessage = getErrorMessage(error, localization.error.delete('Flow Run'))
      showToast(errMessage, 'error')
    }
  }
</script>

<style>
.flow-runs-delete-button-transition-enter-active,
.flow-runs-delete-button-transition-leave-active {
  transition: opacity 0.25s ease;
}

.flow-runs-delete-button-transition-enter-from,
.flow-runs-delete-button-transition-leave-to {
  opacity: 0;
}
</style>