<template>
  <ConfirmDeleteModal
    v-model:showModal="internalShowModal"
    label="Saved Filter"
    :name="savedSearch.name"
    @delete="deleteFilter"
  />
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import { useSavedFlowRunsSearches } from '@/compositions/useSavedFlowRunsSearches'
  import { localization } from '@/localization'
  import { SavedSearch } from '@/models/SavedSearch'
  import { getApiErrorMessage } from '@/utilities/errors'

  const props = defineProps<{
    showModal: boolean,
    savedSearch: SavedSearch,
  }>()

  const emit = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
    (event: 'deleted'): void,
  }>()

  const internalShowModal = computed({
    get() {
      return props.showModal
    },
    set(value: boolean) {
      emit('update:showModal', value)
    },
  })

  const { deleteSavedSearch } = useSavedFlowRunsSearches()

  async function deleteFilter(): Promise<void> {
    try {
      if (props.savedSearch.id) {
        await deleteSavedSearch(props.savedSearch.id)
        showToast(localization.success.deleteSavedSearch, 'success')
        internalShowModal.value = false
        emit('deleted')
      }
    } catch (error) {
      console.error(error)
      const message = getApiErrorMessage(error, localization.error.deleteSavedSearch)
      showToast(message, 'error')
    }
  }
</script>