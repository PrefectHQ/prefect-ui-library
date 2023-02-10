import { InvalidRouteParamValue, RouteParam } from '@prefecthq/vue-compositions'
import { LocationQueryValue } from 'vue-router'
import { DeploymentSortValues, isDeploymentSortValue } from '@/types/SortOptionTypes'

export class DeploymentSortValuesSortParam extends RouteParam<DeploymentSortValues> {
  protected parse(value: LocationQueryValue): DeploymentSortValues {
    if (isDeploymentSortValue(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }

  protected format(value: DeploymentSortValues): LocationQueryValue {
    if (isDeploymentSortValue(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }
}
