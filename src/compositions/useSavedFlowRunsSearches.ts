import { useSubscription } from '@prefecthq/vue-compositions'
import { computed, ComputedRef } from 'vue'
import { useDefaultSavedSearchFilter } from '@/compositions/useDefaultSavedSearchFilter'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { SavedSearch, SavedSearchCreate } from '@/models'
import { builtinSavedSearches, isSameFilter, unsavedPartialSearch } from '@/utilities/savedFilters'

export type SavedFlowRunsSearch = SavedSearch & { isDefault: boolean }

type UseSavedFlowRunsSearches = {
  savedFlowRunsSearches: ComputedRef<SavedFlowRunsSearch[]>,
  createSavedFlowRunsSearch: (search: SavedSearchCreate) => Promise<SavedSearch>,
  deleteSavedFlowRunsSearch: (savedSearchId: string) => Promise<void>,
}

export function useSavedFlowRunsSearches(): UseSavedFlowRunsSearches {
  const api = useWorkspaceApi()
  const savedSearchesSubscription = useSubscription(api.savedSearches.getSavedSearches)
  const savedSearches = computed(() => builtinSavedSearches.concat(savedSearchesSubscription.response ?? []))

  const { value: myDefaultSavedFilter } = useDefaultSavedSearchFilter()

  const savedFlowRunsSearches = computed<SavedFlowRunsSearch[]>(() => {
    let foundSavedSearchForDefaultSavedFilter = false
    const all = savedSearches.value.map(savedSearch => {
      if (isSameFilter(savedSearch.filters, myDefaultSavedFilter.value)) {
        foundSavedSearchForDefaultSavedFilter = true
        return { ...savedSearch, isDefault: true }
      }
      return { ...savedSearch, isDefault: false }
    })

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- false positive
    if (!foundSavedSearchForDefaultSavedFilter) {
      all.unshift({
        ...unsavedPartialSearch,
        filters: myDefaultSavedFilter.value,
        isDefault: true,
      })
    }
    return all
  })

  async function deleteSavedFlowRunsSearch(savedSearchId: string): Promise<void> {
    await api.savedSearches.deleteSavedSearch(savedSearchId)
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
  }
}