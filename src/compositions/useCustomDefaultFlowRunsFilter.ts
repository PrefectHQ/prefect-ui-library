import { useLocalStorage } from '@prefecthq/vue-compositions'
import { ComputedRef, computed, Ref } from 'vue'
import { getCacheKey, FlowRunsFilter, SavedSearchFilter, mapper } from '..'

const customDefaultFlowRunsFilterKey = getCacheKey('prefect-ui-library-custom-default-flow-runs-filter')

type CustomDefaultFlowRunsFilter = {
  value: Ref<SavedSearchFilter | null>,
  set: (value: SavedSearchFilter) => void,
  asFlowRunsFilter: ComputedRef<FlowRunsFilter | null>,
}

export function useCustomDefaultFlowRunsFilter(): CustomDefaultFlowRunsFilter {
  const { value, set } = useLocalStorage<SavedSearchFilter>(customDefaultFlowRunsFilterKey)

  const asFlowRunsFilter = computed(() => mapper.map('SavedSearchFilter', value.value, 'FlowRunsFilter'))

  return {
    value: value,
    set,
    asFlowRunsFilter,
  }
}