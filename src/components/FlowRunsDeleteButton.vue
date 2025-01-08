<template>
  <Transition name="flow-runs-delete-button-transition">
    <p-button v-if="selected.length > 0" icon="TrashIcon" small @click="open" />
  </Transition>

  <ConfirmDeleteModal
    v-model:showModal="showModal"
    name="selected flow runs"
    label="Flow runs"
    :loading
    @delete="() => deleteFlowRuns(selected)"
  />
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
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
  const loading = ref(false)

  const deleteFlowRuns = async (flowRuns: string[]): Promise<void> => {
    loading.value = true

    const toastMessage = computed(() => {
      if (flowRuns.length === 1) {
        return 'Flow run deleted'
      }
      return `${flowRuns.length} flow runs deleted`
    })

    const promises = flowRuns.map(flowRunId => deleteFlowRun(flowRunId))
    const values = await Promise.allSettled(promises)
    const errors = values.filter(value => value.status === 'rejected').map(value => value.reason)

    if (errors.length > 0) {
      if (errors.length === 1) {
        const message = getApiErrorMessage(errors[0], localization.error.delete('Flow Run'))
        showToast(message, 'error')
      } else {
        showToast(`${errors.length} flow runs failed to delete`, 'error')
      }

      loading.value = false
      return
    }

    loading.value = false
    showToast(toastMessage, 'success')
    emit('delete')
    close()
  }

  async function deleteFlowRun(flowRunId: string, retries = 0): Promise<void> {
    try {
      await api.flowRuns.deleteFlowRun(flowRunId)
    } catch (error) {
      if (retries < 2) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        return deleteFlowRun(flowRunId, retries + 1)
      }

      throw error
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