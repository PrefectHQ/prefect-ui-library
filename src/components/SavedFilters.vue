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
  import { computed, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import SavedFiltersMenu from '@/components/SavedFiltersMenu.vue'
  import { getQueryForFlowRunsFilter, useFlowRunsFilterFromRoute, useWorkspaceApi } from '@/compositions'
  import { useCustomDefaultFlowRunsFilter } from '@/compositions/useCustomDefaultFlowRunsFilter'
  import { SavedSearch, SavedSearchFilter } from '@/models/SavedSearch'
  import { mapper } from '@/services'
  import { customSavedSearch, oneWeekSavedSearch, isSameFilter, isEmptyFilter } from '@/utilities/savedFilters'

  const api = useWorkspaceApi()

  const { filter, set: setFilters } = useFlowRunsFilterFromRoute()
  const savedSearchesSubscription = useSubscription(api.savedSearches.getSavedSearches)
  const savedSearches = computed(() => savedSearchesSubscription.response ?? [])

  const options = computed<SelectOption[]>(() => {
    const allOptions = savedSearches.value.map(({ name }) => ({
      label: name === nameOfDefaultFilter.value ? `${name} (default)` : name,
      value: name,
      disabled: name === customSavedSearch.name,
    }))

    if (selectModelValue.value !== customSavedSearch.name) {
      return allOptions.filter(({ label }) => label !== customSavedSearch.name)
    }

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

  const router = useRouter()
  const { value: mySavedCustomDefaultFilter, asFlowRunsFilter: myCustomDefaultFilter } = useCustomDefaultFlowRunsFilter()
  const nameOfDefaultFilter = computed(() => {
    const customDefault = mySavedCustomDefaultFilter.value
    if (!savedSearches.value.length || !customDefault) {
      return oneWeekSavedSearch.name
    }
    // TODO: handle case where customDefault is not in savedSearches
    return savedSearches.value.find(({ filters }) => isSameFilter(filters, customDefault))?.name ?? oneWeekSavedSearch.name
  })
  watch(filterInRoute, (newValue) => {
    if (myCustomDefaultFilter.value !== null && isEmptyFilter(newValue)) {
      const query = getQueryForFlowRunsFilter(myCustomDefaultFilter.value)
      router.replace({ query })
    }
  }, { immediate: true })

  const selectedSavedSearch = computed({
    get() {
      const found = savedSearches.value.find(({ name, filters }) => name != customSavedSearch.name && isSameFilter(filters, filterInRoute.value))

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