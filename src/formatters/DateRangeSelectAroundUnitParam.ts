import { DateRangeSelectAroundUnit, isDateRangeSelectAroundUnit } from '@prefecthq/prefect-design'
import { RouteParam, InvalidRouteParamValue } from '@prefecthq/vue-compositions'
import { LocationQueryValue } from 'vue-router'

export class DateRangeSelectAroundUnitParam extends RouteParam<DateRangeSelectAroundUnit> {
  protected override parse(value: LocationQueryValue): DateRangeSelectAroundUnit {
    if (isDateRangeSelectAroundUnit(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }

  protected override format(value: DateRangeSelectAroundUnit): LocationQueryValue {
    if (isDateRangeSelectAroundUnit(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }
}