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
  import { computed } from 'vue'
  import SavedFiltersMenu from '@/components/SavedFiltersMenu.vue'
  import { useFlowRunsFilterFromRoute } from '@/compositions'
  import { SavedFlowRunsSearch, useSavedFlowRunsSearches } from '@/compositions/useSavedFlowRunsSearches'
  import { SavedSearch, SavedSearchFilter } from '@/models/SavedSearch'
  import { mapper } from '@/services'
  import { customSavedSearch, isSameFilter } from '@/utilities/savedFilters'

  const { filter, set: setFilters } = useFlowRunsFilterFromRoute()

  const { savedFlowRunsSearches } = useSavedFlowRunsSearches()

  const options = computed<SelectOption[]>(() => {
    const allOptions = savedFlowRunsSearches.value
      .filter(({ name }) => name !== customSavedSearch.name || selectModelValue.value === customSavedSearch.name)
      .map(({ name, isDefault }) => ({
        label: isDefault ? `${name} (default)` : name,
        value: name,
        disabled: name === customSavedSearch.name,
      }))


    return allOptions
  })

  const filterInRoute = computed<SavedSearchFilter>(() => ({
    state: filter.flowRuns.state.name ?? [],
    flow: filter.flows.id ?? [],
    deployment: filter.deployments.id ?? [],
    workPool: filter.workPools.name ?? [],
    tag: filter.flowRuns.tags.name ?? [],
    startDate: filter.flowRuns.expectedStartTimeAfter != undefined ? String(filter.flowRuns.expectedStartTimeAfter) : undefined,
    endDate: filter.flowRuns.expectedStartTimeBefore != undefined ? String(filter.flowRuns.expectedStartTimeBefore) : undefined,
  }))

  const selectedSavedSearch = computed<SavedFlowRunsSearch>({
    get() {
      const found = savedFlowRunsSearches.value.find(({ name, filters }) => name != customSavedSearch.name && isSameFilter(filters, filterInRoute.value))

      return found ?? { ...customSavedSearch, isDefault: false }
    },
    set(search: SavedSearch) {
      const filters = mapper.map('SavedSearchFilter', search.filters, 'FlowRunsFilter')

      setFilters(filters)
    },
  })

  const selectModelValue = computed({
    get() {
      return selectedSavedSearch.value.name
    },
    set(value: string | null) {
      const selected = savedFlowRunsSearches.value.find(({ name }) => value === name)!

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