import { DateRangeSelectValue } from '@prefecthq/prefect-design'
import { DateRouteParam, NumberRouteParam, useRouteQueryParam } from '@prefecthq/vue-compositions'
import { computed, reactive } from 'vue'
import { DateRangeSelectAroundPeriodParam } from '@/formatters/DateRangeSelectAroundPeriodParam'
import { DateRangeSelectAroundUnitParam } from '@/formatters/DateRangeSelectAroundUnitParam'
import { DateRangeSelectTypeParam } from '@/formatters/DateRangeSelectTypeParam'

export function useDateRangeSelectValueFromRoute(defaultValue: DateRangeSelectValue = null): { range: DateRangeSelectValue } {
  const date = useRouteQueryParam('date', DateRouteParam)
  const endDate = useRouteQueryParam('endDate', DateRouteParam)
  const period = useRouteQueryParam('period', DateRangeSelectAroundPeriodParam)
  const quantity = useRouteQueryParam('quantity', NumberRouteParam)
  const seconds = useRouteQueryParam('seconds', NumberRouteParam)
  const startDate = useRouteQueryParam('startDate', DateRouteParam)
  const type = useRouteQueryParam('type', DateRangeSelectTypeParam)
  const unit = useRouteQueryParam('unit', DateRangeSelectAroundUnitParam)

  function getRangeValue(): DateRangeSelectValue {
    if (startDate.value && endDate.value) {
      return { type: 'range', startDate: startDate.value, endDate: endDate.value }
    }

    return defaultValue
  }

  function getSpanValue(): DateRangeSelectValue {
    if (seconds.value) {
      return { type: 'span', seconds: seconds.value }
    }

    return defaultValue
  }

  function getAroundValue(): DateRangeSelectValue {
    if (date.value && unit.value && quantity.value) {
      return { type: 'around', date: date.value, unit: unit.value, quantity: quantity.value }
    }

    return defaultValue
  }

  function getPeriodValue(): DateRangeSelectValue {
    if (period.value) {
      return { type: 'period', period: period.value }
    }

    return defaultValue
  }

  const range = computed<DateRangeSelectValue>({
    get() {
      if (!type.value) {
        return defaultValue
      }

      switch (type.value) {
        case 'range':
          return getRangeValue()
        case 'span':
          return getSpanValue()
        case 'around':
          return getAroundValue()
        case 'period':
          return getPeriodValue()
        default:
          const exhaustive: never = type.value
          throw new Error(`No getter for ${exhaustive}`)
      }

    },
    set(value) {
      if (!value) {
        date.value = undefined
        endDate.value = undefined
        period.value = undefined
        quantity.value = undefined
        seconds.value = undefined
        startDate.value = undefined
        type.value = undefined
        unit.value = undefined
        return
      }

      switch (value.type) {
        case 'range':
          date.value = undefined
          endDate.value = value.endDate
          period.value = undefined
          quantity.value = undefined
          seconds.value = undefined
          startDate.value = value.startDate
          type.value = 'range'
          unit.value = undefined
          break
        case 'span':
          date.value = undefined
          endDate.value = undefined
          period.value = undefined
          quantity.value = undefined
          seconds.value = value.seconds
          startDate.value = undefined
          type.value = 'span'
          unit.value = undefined
          break
        case 'around':
          date.value = value.date
          endDate.value = undefined
          period.value = undefined
          quantity.value = value.quantity
          seconds.value = undefined
          startDate.value = undefined
          type.value = 'around'
          unit.value = value.unit
          break
        case 'period':
          date.value = undefined
          endDate.value = undefined
          period.value = value.period
          quantity.value = undefined
          seconds.value = undefined
          startDate.value = undefined
          type.value = 'period'
          unit.value = undefined
          break
        default:
          const exhaustive: never = value
          throw new Error(`No setter for ${exhaustive}`)
      }
    },
  })

  return reactive({
    range,
  })
}