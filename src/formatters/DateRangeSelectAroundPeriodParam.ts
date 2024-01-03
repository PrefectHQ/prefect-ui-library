import { DateRangeSelectPeriod, isDateRangeSelectPeriod } from '@prefecthq/prefect-design'
import { RouteParam, InvalidRouteParamValue } from '@prefecthq/vue-compositions'
import { LocationQueryValue } from 'vue-router'

export class DateRangeSelectAroundPeriodParam extends RouteParam<DateRangeSelectPeriod> {
  protected override parse(value: LocationQueryValue): DateRangeSelectPeriod {
    if (isDateRangeSelectPeriod(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }

  protected override format(value: DateRangeSelectPeriod): LocationQueryValue {
    if (isDateRangeSelectPeriod(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }
}