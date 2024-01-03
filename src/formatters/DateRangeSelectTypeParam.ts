import { DateRangeSelectType, isDateRangeSelectType } from '@prefecthq/prefect-design'
import { RouteParam, InvalidRouteParamValue } from '@prefecthq/vue-compositions'
import { LocationQueryValue } from 'vue-router'

export class DateRangeSelectTypeParam extends RouteParam<DateRangeSelectType> {
  protected override parse(value: LocationQueryValue): DateRangeSelectType {
    if (isDateRangeSelectType(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }

  protected override format(value: DateRangeSelectType): LocationQueryValue {
    if (isDateRangeSelectType(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }
}