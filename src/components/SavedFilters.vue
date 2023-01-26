<template>
  <div class="saved-filters">
    <p-select
      v-model="selectModelValue"
      :options="options"
      class="saved-filters__select"
    />
    <SavedFiltersMenu v-model:saved-search="selectedSavedSearch" />
  </div>
</template>

<script setup lang="ts">
  import { SelectOption } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import SavedFiltersMenu from '@/components/SavedFiltersMenu.vue'
  import { useFlowRunsFilterFromRoute, useWorkspaceApi } from '@/compositions'
  import { SavedSearch, SavedSearchFilter } from '@/models/SavedSearch'
  import { mapper } from '@/services'
  import { customSavedSearch, isSameFilter } from '@/utilities/savedFilters'

  const api = useWorkspaceApi()

  const { filter, set: setFilters } = useFlowRunsFilterFromRoute()
  const savedSearchesSubscription = useSubscription(api.savedSearches.getSavedSearches)
  const savedSearches = computed(() => savedSearchesSubscription.response ?? [])

  const options = computed<SelectOption[]>(() => {
    const allOptions = savedSearches.value.map(({ name }) => ({
      label: name,
      value: name,
      disabled: name === customSavedSearch.name,
    }))

    if (selectModelValue.value !== customSavedSearch.name) {
      return allOptions.filter(({ label }) => label !== customSavedSearch.name)
    }

    return allOptions
  })

  const selectedSavedSearch = computed({
    get() {
      const inRoute: SavedSearchFilter = {
        state: filter.flowRuns.state.name ?? [],
        flow: filter.flows.name ?? [],
        deployment: filter.deployments.id ?? [],
        tag: filter.flowRuns.tags.name ?? [],
      }

      const found = savedSearches.value.find(({ name, filters }) => name != customSavedSearch.name && isSameFilter(filters, inRoute))

      return found ?? customSavedSearch
    },
    set(search: SavedSearch) {
      const filters = mapper.map('SavedSearchFilter', search.filters, 'FlowRunFilters')

      setFilters(filters)
    },
  })

  const selectModelValue = computed({
    get() {
      return selectedSavedSearch.value.name
    },
    set(value: string | null) {
      const selected = savedSearches.value.find(({ name }) => value === name)!

      selectedSavedSearch.value = selected
    },
  })
</script>

<style>
.saved-filters { @apply
  flex
  gap-2
}

.saved-filters__select { @apply
  max-w-full
}
</style>