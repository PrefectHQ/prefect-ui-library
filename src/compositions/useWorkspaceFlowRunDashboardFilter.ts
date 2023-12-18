import { DateRangeSelectValue } from '@prefecthq/prefect-design'
import { useRouteQueryParam, DateRouteParam, NumberRouteParam } from '@prefecthq/vue-compositions'
import { computed, reactive } from 'vue'
import { SavedSearchFilter } from '@/models/SavedSearch'
import { filterRangePastWeek } from '@/utilities/savedFilters'

export function useWorkspaceFlowRunDashboardFilterFromRoute(): SavedSearchFilter {
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

  return reactive({
    range,
    tag,
    deployment,
    workPool,
    workQueue,
    flow,
    state,
  })
}