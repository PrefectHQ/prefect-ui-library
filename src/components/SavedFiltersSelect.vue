<template class="saved-filters-select">
  <p-select v-model="selectedSavedSearch" :options="options" class="flow-runs-filter-select" />
  <p-icon-button-menu :disabled="selectedSavedSearch != 'Custom' && !savedSearchId">
    <p-overflow-menu-item v-if="selectedSavedSearch == 'Custom'" @click="openSaveModal">
      Save Filter
    </p-overflow-menu-item>
    <p-overflow-menu-item v-if="savedSearchId" inset @click="openDeleteModal">
      Delete Filter
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
  import { SelectOption, showToast, formatDateTimeNumeric } from '@prefecthq/prefect-design'
  import { addDays, endOfToday, startOfToday, subDays } from 'date-fns'
  import  equal  from 'fast-deep-equal'
  import { watchEffect, ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import SaveFilterModal from '@/components/SaveFilterModal.vue'
  import { useFlowRunFilterFromRoute, useShowModal } from '@/compositions'
  import { localization } from '@/localization'
  import { workspaceApiKey } from '@/utilities'
  import { inject } from '@/utilities/inject'

  const router = useRouter()
  const api = inject(workspaceApiKey)
  const { showModal: showSaveModal, open: openSaveModal, close: closeSaveModal } = useShowModal()
  const { showModal: showDeleteModal, open: openDeleteModal } = useShowModal()
  const savedSearches = ref(await api.savedSearches.getSavedSearches({}))
  const { flows, states, tags, deployments, hasFilters } = useFlowRunFilterFromRoute()

  onMounted(() => {
    if (hasFilters.value) {
      selectedSavedSearch.value = 'Custom'
      return
    }
    selectedSavedSearch.value = 'One week(default)'
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
      savedSearches.value = await api.savedSearches.getSavedSearches({})
      showToast(localization.success.createSavedSearch, 'success')
      selectedSavedSearch.value = filterName
      closeSaveModal()
    } catch (error) {
      console.warn(error)
      showToast(localization.error.createSavedSearch, 'error')
    }
  }

  const deleteFilter = async (): Promise<void> => {
    try {
      if (savedSearchId.value) {
        await api.savedSearches.deleteSavedSearch(savedSearchId.value)
        savedSearches.value = await api.savedSearches.getSavedSearches({})
        selectedSavedSearch.value = 'One week(default)'
        showToast(localization.success.deleteSavedSearch, 'success')
      }
    } catch (error) {
      console.warn(error)
      showToast(localization.error.deleteSavedSearch, 'error')
    }
  }

  const modifiedSavedSearches = computed(()=> [
    { name: 'Custom', id: null },
    {
      name: 'One week(default)',
      filters: {
        startDate: formatDateTimeNumeric(subDays(startOfToday(), 7)),
        endDate: formatDateTimeNumeric(addDays(endOfToday(), 1)),
        state: [],
        flow: [],
        tag: [],
        deployment: [],
        id: null,
      },
    },
    {
      name: 'No scheduled',
      filters: {
        id: null,
        state: ['completed', 'failed', 'running', 'pending', 'crashed', 'cancelled'],
        flow: [],
        tag: [],
        deployment: [],
        startDate: formatDateTimeNumeric(subDays(startOfToday(), 7)),
        endDate: formatDateTimeNumeric(addDays(endOfToday(), 1)),
      },
    },
    ...savedSearches.value,
  ])

  const options = computed<SelectOption[]>(() => modifiedSavedSearches.value.map(search => {
    return { label: search.name, value: search.name }
  }))

  const selectedSavedSearch = ref()
  const selectedSavedSearchValue = computed(() => modifiedSavedSearches.value.find(filter => filter.name === selectedSavedSearch.value))
  const savedSearchId = computed(() => selectedSavedSearchValue.value?.id)

  watchEffect(async ()=> {
    const selectedFilter = selectedSavedSearchValue.value?.filters
    if (selectedFilter) {
      await router.push({ query: selectedFilter })
      if (!equal(states.value, selectedFilter.state)) {
        selectedSavedSearch.value = 'Custom'
      }
      if (!equal(flows.value, selectedFilter.flow)) {
        selectedSavedSearch.value = 'Custom'
        return
      }
      if (!equal(tags.value, selectedFilter.tag)) {
        selectedSavedSearch.value = 'Custom'
        return
      }
      if (!equal(deployments.value, selectedFilter.deployment)) {
        selectedSavedSearch.value = 'Custom'
      }
    }
  },
  )
</script>

<style>
.flow-runs-filter-select {
  @apply w-48
}
</style>