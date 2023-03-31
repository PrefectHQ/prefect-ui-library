<template>
  <p-button v-if="variableIds.length > 0" danger icon="TrashIcon" @click="open" />
  <ConfirmDeleteModal
    v-model:showModal="showModal"
    :name="localization.info.selectedVariables"
    :label="localization.info.variables"
    @delete="deleteVariables(variableIds)"
  />
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import { useShowModal, useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { toPluralString } from '@/utilities'

  defineProps<{
    variableIds: string[],
  }>()

  const emit = defineEmits<{
    (event: 'delete'): string[],
  }>()

  const { showModal, open, close } = useShowModal()

  const api = useWorkspaceApi()

  const deleteVariables = async (variableIds: string[]): Promise<void> => {
    try {
      const variableDeletePromises = variableIds.map(api.variables.deleteVariable)
      await Promise.all(variableDeletePromises)

      const successMessage = localization.success.delete(`${variableIds.length} ${toPluralString(localization.info.variable, variableIds.length)}`)
      showToast(successMessage, 'success')
      emit('delete')
    } catch (error) {
      showToast(localization.error.delete(localization.info.variables), 'error')
    } finally {
      close()
    }
  }
</script>