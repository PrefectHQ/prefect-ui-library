import { InvalidRouteParamValue, RouteParam } from '@prefecthq/vue-compositions'
import { LocationQueryValue } from 'vue-router'
import { isOperation, Operation } from '@/models/Filters'

export class OperatorRouteParam extends RouteParam<Operation> {
  protected override parse(value: LocationQueryValue): Operation {
    if (value === null || !isOperation(value)) {
      throw new InvalidRouteParamValue()
    }

    return value
  }

  protected override format(value: Operation): LocationQueryValue {
    return `${value}`
  }
}
