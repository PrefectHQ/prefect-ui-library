import { DateRangeSelectValue } from '@prefecthq/prefect-design'
import { useRouteQueryParam, DateRouteParam, NumberRouteParam } from '@prefecthq/vue-compositions'
import { ComputedRef, computed, reactive } from 'vue'
import { SavedSearchFilter } from '@/models/SavedSearch'
import { filterRangePastWeek, isSameFilter, oneWeekFilter } from '@/utilities/savedFilters'

type UseWorkspaceFlowRunDashboardFilterFromRoute = {
  filter: SavedSearchFilter,
  setFilter: (filter: SavedSearchFilter) => void,
  isCustom: ComputedRef<boolean>,
}

export function useWorkspaceFlowRunDashboardFilterFromRoute(): UseWorkspaceFlowRunDashboardFilterFromRoute {
  const startDate = useRouteQueryParam('startDate', DateRouteParam)
  const endDate = useRouteQueryParam('endDate', DateRouteParam)
  const seconds = useRouteQueryParam('seconds', NumberRouteParam)
  const type = useRouteQueryParam('type')
  const tag = useRouteQueryParam('tag', [])
  const deployment = useRouteQueryParam('deployment', [])
  const workPool = useRouteQueryParam('workPool', [])
  const workQueue = useRouteQueryParam('workQueue', [])
  const flow = useRouteQueryParam('flow', [])
  const state = useRouteQueryParam('state', [])

  const range = computed<NonNullable<DateRangeSelectValue>>({
    get() {
      if (type.value === 'range' && startDate.value && endDate.value) {
        return { type: 'range', startDate: startDate.value, endDate: endDate.value }
      }

      if (type.value === 'span' && seconds.value) {
        return { type: 'span', seconds: seconds.value }
      }

      return filterRangePastWeek
    },
    set(value) {
      if (value.type === 'range') {
        type.value = 'range'
        startDate.value = value.startDate
        endDate.value = value.endDate
        seconds.value = undefined
      }

      if (value.type === 'span') {
        type.value = 'span'
        startDate.value = undefined
        endDate.value = undefined
        seconds.value = value.seconds
      }
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