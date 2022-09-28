<template>
  <p-select v-model="selectedSavedSearch" :options="options" class="flow-runs-filter-select" />
  <p-icon-button-menu>
    <p-overflow-menu-item @click="open">
      Save Filter
    </p-overflow-menu-item>
    <p-overflow-menu-item inset :disabled="!savedSearchId" @click="deleteFilter">
      Delete Filter
    </p-overflow-menu-item>
  </p-icon-button-menu>
  <SaveSearchModal v-model:show-modal="showModal" @save="saveFilter" />
</template>

<script setup lang="ts">
  import { showToast } from '@prefecthq/prefect-design'
  import { watch, ref, computed, Ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import SaveSearchModal from '@/components/SaveSearchModal.vue'
  import { useFlowRunFilterFromRoute, useShowModal } from '@/compositions'
  import { localization } from '@/localization'
  import { flowRunsRouteKey } from '@/router'
  import { workspaceApiKey } from '@/utilities'
  import { inject } from '@/utilities/inject'

  const router = useRouter()
  const flowRunsRoute = inject(flowRunsRouteKey)
  const api = inject(workspaceApiKey)
  const { showModal, open, close } = useShowModal()
  const savedSearches = ref(await api.savedSearches.getSavedSearches({}))
  const { flows, states, tags, deployments, hasFilters } = useFlowRunFilterFromRoute()

  onMounted(() => {
    if (hasFilters.value) {
      selectedSavedSearch.value = 'URL'
    }
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
      close()
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
        selectedSavedSearch.value = 'default'
        showToast(localization.success.deleteSavedSearch, 'success')
      }
    } catch (error) {
      console.warn(error)
      showToast(localization.error.deleteSavedSearch, 'error')
    }
  }

  const savedSearchOptions = computed(() => savedSearches.value.map(search => {
    return { label: search.name, value: search.name }
  }))

  const options: Ref<{ label: string, value: string }[]> = computed(() => [{ label: 'Default (one week)', value: 'default' }, { label: 'From url', value: 'URL' }, ...savedSearchOptions.value])
  const selectedSavedSearch = ref('default')
  const selectedSavedSearchValue = computed(() => savedSearches.value.find(filter => filter.name === selectedSavedSearch.value))
  const savedSearchId = computed(() => selectedSavedSearchValue.value?.id ?? '')

  watch(selectedSavedSearch, () => {
    const selectedFilter = selectedSavedSearchValue.value?.filters
    if (selectedFilter) {
      router.push({ query: selectedFilter })
      return
    } if (selectedSavedSearch.value !== 'URL') {
      router.push(flowRunsRoute())
    }
  })
</script>

<style>
.flow-runs-filter-select {
  @apply w-48
}
</style>