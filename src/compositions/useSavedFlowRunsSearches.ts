import { useSubscription } from '@prefecthq/vue-compositions'
import { computed, ComputedRef } from 'vue'
import { useCustomDefaultFlowRunsFilter } from '@/compositions/useCustomDefaultFlowRunsFilter'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { FlowRunsFilter, SavedSearch, SavedSearchCreate } from '@/models'
import { mapper } from '@/services'
import { builtinSavedSearches, customSavedSearch, isSameFilter, systemDefaultSavedSearch } from '@/utilities/savedFilters'

export class SavedFlowRunsSearch extends SavedSearch {
  public isDefault: boolean = false

  public static fromSavedSearch(savedSearch: SavedSearch, isDefault: boolean): SavedFlowRunsSearch {
    const savedFlowRunsSearch = new SavedFlowRunsSearch(savedSearch)
    savedFlowRunsSearch.isDefault = isDefault
    return savedFlowRunsSearch
  }
}

type UseSavedFlowRunsSearches = {
  savedFlowRunsSearches: ComputedRef<SavedFlowRunsSearch[]>,
  createSavedSearch: (search: SavedSearchCreate) => Promise<SavedSearch>,
  deleteSavedSearch: (savedSearchId: string) => Promise<void>,
  default: ComputedRef<FlowRunsFilter>,
  hasCustomDefault: ComputedRef<boolean>,
}

export function useSavedFlowRunsSearches(): UseSavedFlowRunsSearches {
  const api = useWorkspaceApi()
  const savedSearchesSubscription = useSubscription(api.savedSearches.getSavedSearches)
  const savedSearches = computed(() => builtinSavedSearches.concat(savedSearchesSubscription.response ?? []))
  const matchedCustomDefaultSavedSearch = computed(() => savedSearches.value.find(search => search.name !== customSavedSearch.name && isSameFilter(search.filters, myDefaultSavedFilter.value)))
  const savedFlowRunsSearches = computed(() => savedSearches.value.map(search => ({ ...search, isDefault: matchedCustomDefaultSavedSearch.value?.name === search.name })))

  // TODO: handle case where customDefault is not in savedSearches


  async function deleteSavedSearch(savedSearchId: string): Promise<void> {
    await api.savedSearches.deleteSavedSearch(savedSearchId)
    if (matchedCustomDefaultSavedSearch.value?.id === savedSearchId) {
      removeDefault()
    }
    savedSearchesSubscription.refresh()
  }

  async function createSavedSearch(search: SavedSearchCreate): Promise<SavedSearch> {
    const savedSearch = await api.savedSearches.createSavedSearch(search)
    savedSearchesSubscription.refresh()
    return savedSearch
  }

  const { value: myCustomDefaultSavedSearchFilter, remove: removeDefault } = useCustomDefaultFlowRunsFilter()
  const hasCustomDefault = computed(() => myCustomDefaultSavedSearchFilter.value !== null)
  const myDefaultSavedFilter = computed(() => myCustomDefaultSavedSearchFilter.value ?? systemDefaultSavedSearch.filters)
  const defaultFlowRunsFilter = computed(() => mapper.map('SavedSearchFilter', myDefaultSavedFilter.value, 'FlowRunsFilter'))
  return {
    savedFlowRunsSearches,
    createSavedSearch,
    deleteSavedSearch,
    default: defaultFlowRunsFilter,
    hasCustomDefault,
  }
}