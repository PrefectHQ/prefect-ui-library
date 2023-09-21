import { useSubscription } from '@prefecthq/vue-compositions'
import { computed, ComputedRef } from 'vue'
import { useCustomDefaultFlowRunsFilter } from '@/compositions/useCustomDefaultFlowRunsFilter'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { FlowRunsFilter, SavedSearch } from '@/models'
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
  default: ComputedRef<FlowRunsFilter>,
  hasCustomDefault: ComputedRef<boolean>,
}

export function useSavedFlowRunsSearches(): UseSavedFlowRunsSearches {
  const api = useWorkspaceApi()
  const savedSearchesSubscription = useSubscription(api.savedSearches.getSavedSearches)
  const builtinSavedSearches: SavedSearch[] = [] // remove me
  const savedFlowRunsSearches = computed(() => builtinSavedSearches.concat(savedSearchesSubscription.response ?? [])
    .map(search => SavedFlowRunsSearch.fromSavedSearch(search,
      search.name !== customSavedSearch.name && isSameFilter(search.filters, myDefaultSavedFilter.value)),
    ),
  )
  // TODO: handle case where customDefault is not in savedSearches


  const { value: myCustomDefaultSavedSearchFilter } = useCustomDefaultFlowRunsFilter()
  const hasCustomDefault = computed(() => myCustomDefaultSavedSearchFilter.value !== null)
  const myDefaultSavedFilter = computed(() => myCustomDefaultSavedSearchFilter.value ?? systemDefaultSavedSearch.filters)
  const defaultFlowRunsFilter = computed(() => mapper.map('SavedSearchFilter', myDefaultSavedFilter.value, 'FlowRunsFilter'))
  return {
    savedFlowRunsSearches,
    default: defaultFlowRunsFilter,
    hasCustomDefault,
  }
}