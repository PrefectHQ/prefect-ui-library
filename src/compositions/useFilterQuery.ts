import { computed, Ref } from 'vue'
import { FiltersQueryService } from '@/services/FiltersQueryService'
import { useFiltersStore } from '@/stores/filters'
import { UnionFilters } from '@/types/UnionFilters'

export function useFilterQuery(): Ref<UnionFilters> {
  const filtersStore = useFiltersStore()

  return computed<UnionFilters>(() => {
    return FiltersQueryService.query(filtersStore.all)
  })
}