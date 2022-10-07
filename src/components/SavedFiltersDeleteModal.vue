<template>
  <ConfirmDeleteModal
    v-model:showModal="internalShowModal"
    label="Saved Filter"
    :name="selectedSearchOption.name"
    @delete="deleteFilter"
  />
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import { localization } from '@/localization'
  import { SearchOption } from '@/models/SavedSearch'
  import { workspaceApiKey } from '@/utilities/api'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    showModal: boolean,
    selectedSearchOption: SearchOption,
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

  const api = inject(workspaceApiKey)
  const savedSearchesSubscription = useSubscription(api.savedSearches.getSavedSearches)

  async function deleteFilter(): Promise<void> {
    try {
      if (props.selectedSearchOption.id) {
        await api.savedSearches.deleteSavedSearch(props.selectedSearchOption.id)
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