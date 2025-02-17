<template>
  <p-button v-if="selected.length > 0" v-bind="attrs" icon="TrashIcon" @click="open" />
  <ConfirmDeleteModal
    v-model:showModal="showModal"
    name="selected deployments"
    label="Deployments"
    @delete="deleteDeployments(selected)"
  />
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { computed, useAttrs } from 'vue'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import { useShowModal, useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { getApiErrorMessage } from '@/utilities/errors'

  defineOptions({
    inheritAttrs: false,
  })

  defineProps<{
    selected: string[],
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const { showModal, open, close } = useShowModal()

  const api = useWorkspaceApi()
  const attrs = useAttrs()

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
      const message = getApiErrorMessage(error, localization.error.delete('deployments'))
      showToast(message, 'error')
    } finally {
      close()
    }
  }
</script>