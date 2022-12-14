<template>
  <Transition name="deployments-delete-button-transition">
    <p-button v-if="selected.length > 0" danger icon="TrashIcon" @click="open" />
  </Transition>
  <ConfirmDeleteModal
    v-model:showModal="showModal"
    name="selected deployments"
    label="Deployments"
    @delete="deleteDeployments(selected)"
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

  const deleteDeployments = async (deployments: string[]): Promise<void> => {
    const toastMessage = computed(() => {
      if (deployments.length === 1) {
        return localization.success.delete('Deployment')
      }
      return localization.success.delete(`${deployments.length} deployments`)
    })

    try {
      const deleteDeployments = deployments.map(api.deployments.deleteDeployment)
      await Promise.all(deleteDeployments)
      showToast(toastMessage, 'success')
      emit('delete')
    } catch (error) {
      showToast(localization.error.delete('deployments'), 'error')
    } finally {
      close()
    }
  }
</script>

<style>
.deployments-delete-button-transition-enter-active,
.deployments-delete-button-transition-leave-active {
  transition: opacity 0.25s ease;
}

.deployments-delete-button-transition-enter-from,
.deployments-delete-button-transition-leave-to {
  opacity: 0;
}
</style>