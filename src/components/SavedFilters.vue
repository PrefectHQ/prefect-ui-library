<template>
  <div class="saved-filters">
    <p-select v-model="selected" :options="options" class="saved-filters__select" />
    <SavedFiltersMenu v-model:filter="selectedSearch" />
  </div>
</template>

<script setup lang="ts">
  import { SelectOption } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import SavedFiltersMenu from '@/components/SavedFiltersMenu.vue'
  import { SavedFlowRunsSearch, useSavedFlowRunsSearches } from '@/compositions/useSavedFlowRunsSearches'
  import { SavedSearchFilter } from '@/models/SavedSearch'
  import { customPartialSearch, isSameFilter } from '@/utilities/savedFilters'

  const props = defineProps<{
    filter: SavedSearchFilter,
  }>()

  const emit = defineEmits<{
    'update:filter': [SavedSearchFilter],
  }>()

  const { savedFlowRunsSearches } = useSavedFlowRunsSearches()

  const options = computed<SelectOption[]>(() => {
    const saved = savedFlowRunsSearches.value.map(({ name, isDefault }) => ({
      label: isDefault ? `${name} (default)` : name,
      value: name,
    }))

    if (findSavedSearchByFilters(props.filter)) {
      return saved
    }

    return [
      { label: customPartialSearch.name, value: customPartialSearch.name, disabled: true },
      ...saved,
    ]
  })

  const selectedSearch = computed<SavedFlowRunsSearch>({
    get() {
      const search = findSavedSearchByFilters(props.filter)

      if (search) {
        return search
      }

      const custom: SavedFlowRunsSearch = { ...customPartialSearch, filters: props.filter, isDefault: false }

      return custom
    },
    set(search) {
      emit('update:filter', search.filters)
    },
  })

  const selected = computed({
    get() {
      return selectedSearch.value.name
    },
    set(name) {
      const search = findSavedSearchByName(name)

      if (search) {
        emit('update:filter', search.filters)
      }
    },
  })

  function findSavedSearchByFilters(filters: SavedSearchFilter): SavedFlowRunsSearch | undefined {
    return savedFlowRunsSearches.value.find(search => isSameFilter(search.filters, filters))
  }

  function findSavedSearchByName(name: string): SavedFlowRunsSearch | undefined {
    return savedFlowRunsSearches.value.find(search => search.name === name)
  }
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