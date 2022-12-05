<template>
  <Transition name="flows-delete-button-transition">
    <p-button v-if="selected.length > 0" danger icon="TrashIcon" @click="open" />
  </Transition>
  <ConfirmDeleteModal
    v-model:showModal="showModal"
    name="selected flows"
    label="Flows"
    @delete="deleteFlows(selected)"
  />
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import { useShowModal, useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'

  defineProps<{
    selected: string[],
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const { showModal, open, close } = useShowModal()

  const api = useWorkspaceApi()

  const deleteFlows = async (flows: string[]): Promise<void> => {
    const toastMessage = computed(() => {
      if (flows.length === 1) {
        return localization.success.delete('Flow')
      }
      return localization.success.delete(`${flows.length} flows`)
    })

    close()

    try {
      const deleteFlows = flows.map(api.flows.deleteFlow)
      await Promise.all(deleteFlows)

      showToast(toastMessage, 'success')
      emit('delete')
    } catch (error) {
      showToast(localization.error.delete('flows'), 'error')
    }
  }
</script>

<style>
.flows-delete-button-transition-enter-active,
.flows-delete-button-transition-leave-active {
  transition: opacity 0.25s ease;
}

.flows-delete-button-transition-enter-from,
.flows-delete-button-transition-leave-to {
  opacity: 0;
}
</style>