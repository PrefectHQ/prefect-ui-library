import { DateRangeSelectValue } from '@prefecthq/prefect-design'
import { useRouteQueryParam, DateRouteParam, NumberRouteParam } from '@prefecthq/vue-compositions'
import { computed, reactive } from 'vue'
import { WorkspaceDashboardFilter } from '@/types/dashboard'

export function useWorkspaceDashboardFilterFromRoute(defaultValue: WorkspaceDashboardFilter): WorkspaceDashboardFilter {
  const startDate = useRouteQueryParam('startDate', DateRouteParam)
  const endDate = useRouteQueryParam('endDate', DateRouteParam)
  const seconds = useRouteQueryParam('seconds', NumberRouteParam)
  const type = useRouteQueryParam('type')
  const tags = useRouteQueryParam('tags', defaultValue.tags)

  const range = computed<NonNullable<DateRangeSelectValue>>({
    get() {
      if (type.value === 'range' && startDate.value && endDate.value) {
        return { type: 'range', startDate: startDate.value, endDate: endDate.value }
      }

      if (type.value === 'span' && seconds.value) {
        return { type: 'span', seconds: seconds.value }
      }

      return defaultValue.range
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
    tags,
  })
}