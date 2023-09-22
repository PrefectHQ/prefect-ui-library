import { useLocalStorage } from '@prefecthq/vue-compositions'
import { getCacheKey, FlowRunsFilter } from '..'

const customDefaultFlowRunsFilterKey = getCacheKey('prefect-ui-library-custom-default-flow-runs-filter')

export function useCustomDefaultFlowRunsFilter(): ReturnType<typeof useLocalStorage<FlowRunsFilter | null>> {
  return useLocalStorage<FlowRunsFilter>(customDefaultFlowRunsFilterKey)
}