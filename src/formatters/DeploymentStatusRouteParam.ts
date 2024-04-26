import { InvalidRouteParamValue, RouteParam } from '@prefecthq/vue-compositions'
import { LocationQueryValue } from 'vue-router'
import { DeploymentStatus, isDeploymentStatus } from '@/models'

export class DeploymentStatusRouteParam extends RouteParam<DeploymentStatus> {
  protected override parse(value: LocationQueryValue): DeploymentStatus {
    if (value === null || !isDeploymentStatus(value)) {
      throw new InvalidRouteParamValue()
    }

    return value
  }

  protected override format(value: DeploymentStatus): LocationQueryValue {
    return value
  }
}
