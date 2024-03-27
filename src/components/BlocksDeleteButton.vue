<template>
  <p-button v-if="selected.length > 0" v-bind="attrs" dangerous icon="TrashIcon" @click="open" />
  <ConfirmDeleteModal
    v-model:showModal="showModal"
    name="selected blocks"
    label="Blocks"
    @delete="deleteBlocks(selected)"
  />
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { computed, useAttrs } from 'vue'
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
  const attrs = useAttrs()

  const deleteBlocks = async (blocks: string[]): Promise<void> => {
    const toastMessage = computed(() => {
      if (blocks.length === 1) {
        return localization.success.delete('Block')
      }
      return localization.success.delete(`${blocks.length} blocks`)
    })

    try {
      const deleteBlocks = blocks.map(api.blockDocuments.deleteBlockDocument)
      await Promise.all(deleteBlocks)
      showToast(toastMessage, 'success')
      emit('delete')
    } catch (error) {
      const message = getApiErrorMessage(error, localization.error.delete('blocks'))
      showToast(message, 'error')
    } finally {
      close()
    }
  }
</script>