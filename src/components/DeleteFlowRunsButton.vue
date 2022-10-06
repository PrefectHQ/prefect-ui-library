<template>
  <Transition name="delete-flow-runs-button-slide">
    <p-button v-if="selected.length > 0" danger icon="TrashIcon" @click="open" />
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
  import { useShowModal } from '@/compositions'
  import { localization } from '@/localization'
  import { flowRunsApiKey  } from '@/services'
  import {  inject } from '@/utilities'

  defineProps<{
    selected: string[],
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const { showModal, open, close } = useShowModal()

  const flowRunsApi = inject(flowRunsApiKey)

  const deleteFlowRuns = async (flowRuns: string[]): Promise<void> => {
    const toastMessage = computed(() => {
      if (flowRuns.length === 1) {
        return 'Flow run deleted'
      }
      return `${flowRuns.length} flow runs deleted`
    })

    close()

    try {
      const deleteFlowRuns = flowRuns.map(flowRunsApi.deleteFlowRun)
      await Promise.all(deleteFlowRuns)

      showToast(toastMessage, 'success')
      emit('delete')
    } catch (error) {
      showToast(localization.error.delete('Flow Run'), 'error')
    }
  }
</script>

<style>
.delete-flow-runs-button-slide-enter-active {
  transition: all 0.4s ease;
}

.delete-flow-runs-button-slide-leave-active {
  transition: all 0.4s ease;
}

.delete-flow-runs-button-slide-enter-from,
.delete-flow-runs-button-slide-leave-to {
  transform: translateX(25px);
  opacity: 0;
}
</style>