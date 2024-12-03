<template>
  <p-button v-if="selected.length > 0" v-bind="attrs" icon="TrashIcon" @click="open" />
  <ConfirmDeleteModal
    v-model:showModal="showModal"
    name="selected flows"
    label="Flows"
    @delete="deleteFlows(selected)"
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

  const deleteFlows = async (flows: string[]): Promise<void> => {
    const toastMessage = computed(() => {
      if (flows.length === 1) {
        return localization.success.delete('Flow')
      }
      return localization.success.delete(`${flows.length} flows`)
    })

    try {
      const deleteFlows = flows.map(api.flows.deleteFlow)
      await Promise.all(deleteFlows)
      showToast(toastMessage, 'success')
      emit('delete')
    } catch (error) {
      const message = getApiErrorMessage(error, localization.error.delete('flows'))
      showToast(message, 'error')
    } finally {
      close()
    }
  }
</script>