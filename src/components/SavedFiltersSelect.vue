<template class="saved-filters">
  <p-select v-model="selectedSavedSearch" :options="options" class="saved-filters__select" />
  <p-icon-button-menu :disabled="selectedSavedSearch != 'Custom' && !savedSearchId">
    <p-overflow-menu-item v-if="selectedSavedSearch == 'Custom' && can.create.saved_search" @click="openSaveModal">
      Save View
    </p-overflow-menu-item>
    <p-overflow-menu-item v-if="savedSearchId && can.delete.saved_search" inset @click="openDeleteModal">
      Delete View
    </p-overflow-menu-item>
  </p-icon-button-menu>
  <SaveFilterModal v-model:show-modal="showSaveModal" @save="saveFilter" />
  <ConfirmDeleteModal
    v-model:showModal="showDeleteModal"
    label="Saved Filter"
    :name="selectedSavedSearch"
    @delete="deleteFilter"
  />
</template>

<script setup lang="ts">
  import { SelectOption, showToast } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { watchEffect, ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import SaveFilterModal from '@/components/SaveFilterModal.vue'
  import { useFlowRunFilterFromRoute, useShowModal } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { localization } from '@/localization'
  import { workspaceApiKey } from '@/utilities'
  import { inject } from '@/utilities/inject'
  import { oneWeekFilter, noScheduleFilter, isCustomFilter } from '@/utilities/savedFilters'

  const can = useCan()
  const { flows, states, tags, deployments, hasFilters } = useFlowRunFilterFromRoute()
  const router = useRouter()
  const api = inject(workspaceApiKey)
  const { showModal: showSaveModal, open: openSaveModal, close: closeSaveModal } = useShowModal()
  const { showModal: showDeleteModal, open: openDeleteModal } = useShowModal()
  const savedSearchesSubscription = useSubscription(api.savedSearches.getSavedSearches)
  const savedSearches = computed(()=> savedSearchesSubscription.response ?? [])
  const defaultFilterValue = 'Default view'

  onMounted(() => {
    if (hasFilters.value) {
      selectedSavedSearch.value = 'Custom'
      return
    }
    selectedSavedSearch.value = defaultFilterValue
  })

  const saveFilter = async (filterName: string): Promise<void> => {
    try {
      await api.savedSearches.createSavedSearch({
        name: filterName,
        filters: {
          state: states.value,
          tag: tags.value,
          flow: flows.value,
          deployment: deployments.value,
        },
      })
      savedSearchesSubscription.refresh()
      showToast(localization.success.createSavedSearch, 'success')
      selectedSavedSearch.value = filterName
      closeSaveModal()
    } catch (error) {
      console.error(error)
      showToast(localization.error.createSavedSearch, 'error')
    }
  }

  const deleteFilter = async (): Promise<void> => {
    try {
      if (savedSearchId.value) {
        await api.savedSearches.deleteSavedSearch(savedSearchId.value)
        savedSearchesSubscription.refresh()
        selectedSavedSearch.value = defaultFilterValue
        showToast(localization.success.deleteSavedSearch, 'success')
      }
    } catch (error) {
      console.error(error)
      showToast(localization.error.deleteSavedSearch, 'error')
    }
  }

  const modifiedSavedSearches = computed(()=> [
    { name: 'Custom', id: null },
    {
      name: defaultFilterValue,
      filters: oneWeekFilter,
    },
    {
      name: 'No scheduled',
      filters: noScheduleFilter,
    },
    ...savedSearches.value,
  ])

  const options = computed<SelectOption[]>(() => modifiedSavedSearches.value.map(search => {
    return { label: search.name, value: search.name,  disabled: search.name === 'Custom' }
  }))

  const selectedSavedSearch = ref()
  const selectedSavedSearchValue = computed(() => modifiedSavedSearches.value.find(filter => filter.name === selectedSavedSearch.value))
  const savedSearchId = computed(() => selectedSavedSearchValue.value?.id)

  watchEffect(async ()=> {
    const selectedFilter = selectedSavedSearchValue.value?.filters
    if (selectedFilter) {
      await router.push({ query: selectedFilter })
      if (isCustomFilter(selectedFilter, states, flows, deployments, tags)) {
        selectedSavedSearch.value = 'Custom'
      }
    }
  })
</script>

<style>
.saved-filters__select {
  @apply w-48
}
</style>