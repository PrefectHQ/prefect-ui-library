import { computed, ComputedRef, InjectionKey, ref } from 'vue'
import { SimpleIdManager } from '@/services/SimpleIdManager'
import { Filter } from '@/types/filters'
import { toRecord } from '@/utilities/arrays'

export type UseFilters = {
  all: ComputedRef<FilterState[]>,
  add: (filter: Required<Filter>) => FilterState,
  remove: (filter: FilterState) => void,
  removeAll: () => void,
  replaceAll: (filters: Required<Filter>[]) => void,
}

export type FilterState = {
  id: number,
} & Required<Filter>

type FiltersState = {
  filters: Record<number, FilterState>,
}

const filtersIdManager = new SimpleIdManager()
const state = ref<FiltersState>({ filters: {} })

export function useFilters(): UseFilters {
  const all = computed(() => Object.values(state.value.filters))

  function add(filter: Required<Filter>): FilterState {
    const id = filtersIdManager.get()
    const filterState = {
      ...filter,
      id,
    }

    state.value.filters[id] = filterState

    return filterState
  }

  function remove(filter: FilterState): void {
    delete state.value.filters[filter.id]
  }

  function removeAll(): void {
    state.value.filters = {}
  }

  function replaceAll(filters: Required<Filter>[]): void {
    const filtersState = filters.map(filter => ({
      ...filter,
      id: filtersIdManager.get(),
    }))

    state.value.filters = toRecord(filtersState, 'id')
  }

  return {
    all,
    add,
    remove,
    removeAll,
    replaceAll,
  }
}

export const filterStoreKey: InjectionKey<UseFilters> = Symbol('filterStoreKey')