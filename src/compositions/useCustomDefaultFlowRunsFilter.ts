import { useLocalStorage } from '@prefecthq/vue-compositions'
import { ComputedRef, computed, Ref } from 'vue'
import { getCacheKey, FlowRunsFilter, SavedSearchFilter, mapper } from '..'

const customDefaultFlowRunsFilterKey = getCacheKey('prefect-ui-library-custom-default-flow-runs-filter')

type CustomDefaultFlowRunsFilter = {
  value: Ref<SavedSearchFilter | null>,
  set: (value: SavedSearchFilter) => void,
  remove: () => void,
  asFlowRunsFilter: ComputedRef<FlowRunsFilter | null>,
}

const { value, set } = useLocalStorage<SavedSearchFilter>(customDefaultFlowRunsFilterKey)

export function useCustomDefaultFlowRunsFilter(): CustomDefaultFlowRunsFilter {
  const asFlowRunsFilter = computed(() => mapper.map('SavedSearchFilter', value.value, 'FlowRunsFilter'))

  const remove = (): void => set(null)

  return {
    value,
    set,
    remove,
    asFlowRunsFilter,
  }
}