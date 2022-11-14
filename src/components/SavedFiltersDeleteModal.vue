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
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { SavedSearch } from '@/models/SavedSearch'

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

  const api = useWorkspaceApi()
  const savedSearchesSubscription = useSubscription(api.savedSearches.getSavedSearches)

  async function deleteFilter(): Promise<void> {
    try {
      if (props.savedSearch.id) {
        await api.savedSearches.deleteSavedSearch(props.savedSearch.id)
        savedSearchesSubscription.refresh()
        showToast(localization.success.deleteSavedSearch, 'success')
        internalShowModal.value = false
        emit('deleted')
      }
    } catch (error) {
      console.error(error)
      showToast(localization.error.deleteSavedSearch, 'error')
    }
  }
</script>