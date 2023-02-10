import { InvalidRouteParamValue, RouteParam } from '@prefecthq/vue-compositions'
import { LocationQueryValue } from 'vue-router'
import { FlowRunSortValues, isFlowRunSortValue } from '@/types/SortOptionTypes'

export class FlowRunSortValuesSortParam extends RouteParam<FlowRunSortValues> {
  protected parse(value: LocationQueryValue): FlowRunSortValues {
    if (isFlowRunSortValue(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }

  protected format(value: FlowRunSortValues): LocationQueryValue {
    if (isFlowRunSortValue(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }
}
