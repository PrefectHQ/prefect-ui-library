import { showToast } from '@prefecthq/prefect-design'
import { useSubscription } from '@prefecthq/vue-compositions'
import { computed, ComputedRef, watch } from 'vue'
import { useDefaultSavedSearchFilter } from '@/compositions/useDefaultSavedSearchFilter'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { FlowRunsFilter, SavedSearch, SavedSearchCreate } from '@/models'
import { mapper } from '@/services'
import { builtinSavedSearches, customSavedSearch, isSameFilter } from '@/utilities/savedFilters'

export type SavedFlowRunsSearch = SavedSearch & { isDefault: boolean }

type UseSavedFlowRunsSearches = {
  savedFlowRunsSearches: ComputedRef<SavedFlowRunsSearch[]>,
  createSavedFlowRunsSearch: (search: SavedSearchCreate) => Promise<SavedSearch>,
  deleteSavedFlowRunsSearch: (savedSearchId: string) => Promise<void>,
  defaultFlowRunsFilter: ComputedRef<FlowRunsFilter>,
}

export function useSavedFlowRunsSearches(): UseSavedFlowRunsSearches {
  const api = useWorkspaceApi()
  const savedSearchesSubscription = useSubscription(api.savedSearches.getSavedSearches)
  const savedSearches = computed(() => builtinSavedSearches.concat(savedSearchesSubscription.response ?? []))

  const { value: myDefaultSavedFilter } = useDefaultSavedSearchFilter()
  const defaultFlowRunsFilter = computed(() => mapper.map('SavedSearchFilter', myDefaultSavedFilter.value, 'FlowRunsFilter'))

  const matchedCustomDefaultSavedSearch = computed(() => savedSearches.value.find(search => search.name !== customSavedSearch.name && isSameFilter(search.filters, myDefaultSavedFilter.value)))
  const savedFlowRunsSearches = computed(() => savedSearches.value.map(search => ({ ...search, isDefault: matchedCustomDefaultSavedSearch.value?.name === search.name })))

  // // handle if customDefault is not in savedSearches i.e. someone else deleted it
  // watch([matchedCustomDefaultSavedSearch, savedSearchesSubscription], ([found, subscription]) => {
  //   if (!found && subscription.executed) {
  //     showToast('Your custom default flow runs filter was deleted by another user. Resave it or select a new default.')
  //     removeDefault()
  //   }
  // })

  async function deleteSavedFlowRunsSearch(savedSearchId: string): Promise<void> {
    await api.savedSearches.deleteSavedSearch(savedSearchId)
    // if (matchedCustomDefaultSavedSearch.value?.id === savedSearchId) {
    //   removeDefault()
    // }
    savedSearchesSubscription.refresh()
  }

  async function createSavedFlowRunsSearch(search: SavedSearchCreate): Promise<SavedSearch> {
    const savedSearch = await api.savedSearches.createSavedSearch(search)
    savedSearchesSubscription.refresh()
    return savedSearch
  }
  return {
    savedFlowRunsSearches,
    createSavedFlowRunsSearch,
    deleteSavedFlowRunsSearch,
    defaultFlowRunsFilter,
  }
}