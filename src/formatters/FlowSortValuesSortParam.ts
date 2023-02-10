import { InvalidRouteParamValue, RouteParam } from '@prefecthq/vue-compositions'
import { LocationQueryValue } from 'vue-router'
import { FlowSortValues, isFlowSortValue } from '@/types/SortOptionTypes'

export class FlowSortValuesSortParam extends RouteParam<FlowSortValues> {
  protected parse(value: LocationQueryValue): FlowSortValues {
    if (isFlowSortValue(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }

  protected format(value: FlowSortValues): LocationQueryValue {
    if (isFlowSortValue(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }
}
