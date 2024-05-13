import { DateRangeSelectValue } from '@prefecthq/prefect-design'
import { BooleanRouteParam, useRouteQueryParam } from '@prefecthq/vue-compositions'
import { computed, reactive } from 'vue'
import { useDateRangeSelectValueFromRoute } from '@/compositions/useDateRangeSelectValue'
import { WorkspaceDashboardFilter } from '@/types/dashboard'

export function useWorkspaceDashboardFilterFromRoute(defaultValue: WorkspaceDashboardFilter): WorkspaceDashboardFilter {
  const tags = useRouteQueryParam('tags', defaultValue.tags)
  const dateRange = useDateRangeSelectValueFromRoute(defaultValue.range)
  const hideSubflows = useRouteQueryParam('hide-subflows', BooleanRouteParam, defaultValue.hideSubflows)

  const range = computed<NonNullable<DateRangeSelectValue>>({
    get() {
      return dateRange.range ?? defaultValue.range
    },
    set(value) {
      dateRange.range = value
    },
  })

  return reactive({
    range,
    tags,
    hideSubflows,
  })
}