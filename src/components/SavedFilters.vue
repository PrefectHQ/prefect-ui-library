<template>
  <div class="saved-filters">
    <p-select
      v-model="selectModelValue"
      :options="options"
      class="saved-filters__select"
    />
    <SavedFiltersMenu
      :selected-search-option="selectedSearchOption"
      @update:selected-search-option="setSelectedFilter"
    />
  </div>
</template>

<script setup lang="ts">
  import { SelectOption } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, onMounted, ref, watch } from 'vue'
  import SavedFiltersMenu from '@/components/SavedFiltersMenu.vue'
  import { useFlowRunFilterFromRoute } from '@/compositions'
  import { SearchOption } from '@/models/SavedSearch'
  import { StateType } from '@/models/StateType'
  import { mapper } from '@/services'
  import { workspaceApiKey } from '@/utilities'
  import { inject } from '@/utilities/inject'
  import { systemSavedSearches, customSavedSearch, defaultSavedSearch, isSameFilter } from '@/utilities/savedFilters'

  const { states, flows, deployments, tags, setFilters } = useFlowRunFilterFromRoute()
  type FlowRunsFilter = [states: StateType[], flows: string[], deployments: string[], tags: string[]]
  const flowRunsFilter = computed<FlowRunsFilter>(() => [states.value, flows.value, deployments.value, tags.value])
  const api = inject(workspaceApiKey)

  const savedSearchesSubscription = useSubscription(api.savedSearches.getSavedSearches)
  const savedSearches = computed(()=> savedSearchesSubscription.response ?? [])

  onMounted(async () => {
    await savedSearchesSubscription.promise()
    selectedSearchOption.value = findSelectedOption(searchOptions.value, flowRunsFilter.value)
  })

  const searchOptions = computed<SearchOption[]>(() => [...systemSavedSearches, ...savedSearches.value])
  const options = computed<SelectOption[]>(() => searchOptions.value.map(({ name }) => ({
    label: name,
    value: name,
    disabled: name === customSavedSearch.name,
  })))

  const selectedSearchOption = ref()
  const selectModelValue = computed({
    get() {
      return selectedSearchOption.value?.name
    },
    set(value: string | null) {
      const selected = searchOptions.value.find(({ name }) => value === name) ?? null

      setSelectedFilter(selected)
    },
  })

  function setSelectedFilter(value: SearchOption | null): void {
    const selectedFilter = value?.filters ?? defaultSavedSearch.filters

    const filtersRequest = mapper.map('SavedSearchFilter', selectedFilter, 'FlowRunFilters')
    setFilters(filtersRequest)
  }

  function findSelectedOption(options: SearchOption[], filter: FlowRunsFilter): SearchOption {
    const found = options.find(({ filters }) => {
      return filters && isSameFilter(filters, ...filter)
    })

    return found ?? customSavedSearch
  }

  watch([states, flows, deployments, tags], (filter) => {
    selectedSearchOption.value = findSelectedOption(searchOptions.value, filter)
  })

  watch(savedSearches, options => {
    selectedSearchOption.value = findSelectedOption([...systemSavedSearches, ...options], flowRunsFilter.value)
  })
</script>

<style>
.saved-filters { @apply
  flex
  gap-2
}

.saved-filters__select { @apply
  w-48
}
</style>