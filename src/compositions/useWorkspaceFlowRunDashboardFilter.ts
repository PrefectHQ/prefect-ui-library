import { DateRangeSelectValue } from '@prefecthq/prefect-design'
import { useRouteQueryParam } from '@prefecthq/vue-compositions'
import { ComputedRef, computed, reactive } from 'vue'
import { useDateRangeSelectValueFromRoute } from '@/compositions/useDateRangeSelectValue'
import { SavedSearchFilter } from '@/models/SavedSearch'
import { filterRangePastWeek, isSameFilter, oneWeekFilter } from '@/utilities/savedFilters'

type UseWorkspaceFlowRunDashboardFilterFromRoute = {
  filter: SavedSearchFilter,
  setFilter: (filter: SavedSearchFilter) => void,
  isCustom: ComputedRef<boolean>,
}

export function useWorkspaceFlowRunDashboardFilterFromRoute(): UseWorkspaceFlowRunDashboardFilterFromRoute {
  const tag = useRouteQueryParam('tag', [])
  const deployment = useRouteQueryParam('deployment', [])
  const workPool = useRouteQueryParam('workPool', [])
  const workQueue = useRouteQueryParam('workQueue', [])
  const flow = useRouteQueryParam('flow', [])
  const state = useRouteQueryParam('state', [])
  const dateRange = useDateRangeSelectValueFromRoute()

  const range = computed<NonNullable<DateRangeSelectValue>>({
    get() {
      return dateRange.range ?? filterRangePastWeek
    },
    set(value) {
      dateRange.range = value
    },
  })

  const filter = reactive({
    range,
    tag,
    deployment,
    workPool,
    workQueue,
    flow,
    state,
  })

  const isCustom = computed(() => isSameFilter(filter, oneWeekFilter))

  function setFilter(filter: SavedSearchFilter): void {
    range.value = filter.range
    tag.value = filter.tag
    deployment.value = filter.deployment
    workPool.value = filter.workPool
    workQueue.value = filter.workQueue
    flow.value = filter.flow
    state.value = filter.state
  }

  return {
    filter,
    setFilter,
    isCustom,
  }
}