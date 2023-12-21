import { DateRangeSelectValue } from '@prefecthq/prefect-design'
import { DateRouteParam, NumberRouteParam, useRouteQueryParam } from '@prefecthq/vue-compositions'
import { computed, reactive } from 'vue'

export function useDateRangeSelectValueFromRoute(defaultValue: DateRangeSelectValue = null): { range: DateRangeSelectValue } {
  const startDate = useRouteQueryParam('startDate', DateRouteParam)
  const endDate = useRouteQueryParam('endDate', DateRouteParam)
  const seconds = useRouteQueryParam('seconds', NumberRouteParam)
  const type = useRouteQueryParam('type')

  const range = computed<DateRangeSelectValue>({
    get() {
      if (type.value === 'range' && startDate.value && endDate.value) {
        return { type: 'range', startDate: startDate.value, endDate: endDate.value }
      }

      if (type.value === 'span' && seconds.value) {
        return { type: 'span', seconds: seconds.value }
      }

      return defaultValue
    },
    set(value) {
      if (value?.type === 'range') {
        type.value = 'range'
        startDate.value = value.startDate
        endDate.value = value.endDate
        seconds.value = undefined
        return
      }

      if (value?.type === 'span') {
        type.value = 'span'
        startDate.value = undefined
        endDate.value = undefined
        seconds.value = value.seconds
        return
      }

      startDate.value = undefined
      endDate.value = undefined
      seconds.value = undefined
      type.value = undefined
    },
  })

  return reactive({
    range,
  })
}