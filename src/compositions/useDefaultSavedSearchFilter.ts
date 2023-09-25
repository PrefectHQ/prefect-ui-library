import { useLocalStorage } from '@prefecthq/vue-compositions'
import { ComputedRef, computed } from 'vue'
import { getCacheKey, SavedSearchFilter, systemDefaultSavedSearch, isSameFilter } from '..'

const customDefaultFlowRunsFilterKey = getCacheKey('prefect-ui-library-custom-default-flow-runs-filter')

type UseDefaultSavedSearchFilter = {
  value: ComputedRef<SavedSearchFilter>,
  set: (value: SavedSearchFilter) => void,
  remove: () => void,
  isCustom: ComputedRef<boolean>,
}

const { value: custom, set: setCustom } = useLocalStorage<SavedSearchFilter>(customDefaultFlowRunsFilterKey)

export function useDefaultSavedSearchFilter(): UseDefaultSavedSearchFilter {
  const value = computed(() => custom.value ?? systemDefaultSavedSearch.filters)

  const isCustom = computed(() => custom.value !== null)

  function set(value: SavedSearchFilter): void {
    // setting to the system default is equivalent to removing the custom default
    if (isSameFilter(value, systemDefaultSavedSearch.filters)) {
      remove()
    } else {
      setCustom(value)
    }
  }

  function remove(): void {
    setCustom(null)
  }

  return {
    value,
    set,
    remove,
    isCustom,
  }
}