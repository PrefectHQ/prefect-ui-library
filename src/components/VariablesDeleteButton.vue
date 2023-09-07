<template>
  <p-button v-if="variableIds.length > 0" small dangerous icon="TrashIcon" @click="open" />
  <ConfirmDeleteModal
    v-model:showModal="showModal"
    :name="modalName"
    :label="localization.info.variables"
    @delete="deleteVariables(variableIds)"
  />
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import { useShowModal, useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { toPluralString } from '@/utilities'
  import { getApiErrorMessage } from '@/utilities/errors'

  const props = defineProps<{
    variableIds: string[],
  }>()

  const emit = defineEmits<{
    (event: 'delete'): string[],
  }>()

  const { showModal, open, close } = useShowModal()

  const api = useWorkspaceApi()

  const modalName = computed(() => {
    if (props.variableIds.length === 1) {
      return localization.info.thisVariable
    }
    return localization.info.theseVariables
  })

  const deleteVariables = async (variableIds: string[]): Promise<void> => {
    try {
      const variableDeletePromises = variableIds.map(api.variables.deleteVariable)
      await Promise.all(variableDeletePromises)

      const successMessage = localization.success.delete(`${variableIds.length} ${toPluralString(localization.info.variable, variableIds.length)}`)
      showToast(successMessage, 'success')
      emit('delete')
    } catch (error) {
      const message = getApiErrorMessage(error, localization.error.delete(localization.info.variables))
      showToast(message, 'error')
    } finally {
      close()
    }
  }
</script>