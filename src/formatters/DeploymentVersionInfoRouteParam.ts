import { InvalidRouteParamValue, RouteParam } from '@prefecthq/vue-compositions'
import { LocationQueryValue } from 'vue-router'
import { DeploymentVersionInfo, isDeploymentVersionInfo } from '@/models/Filters'

export class DeploymentVersionInfoRouteParam extends RouteParam<DeploymentVersionInfo> {
  protected override parse(value: LocationQueryValue): DeploymentVersionInfo {
    if (value === null || typeof value !== 'string') {
      throw new InvalidRouteParamValue()
    }

    const parsed = JSON.parse(value)

    if (!isDeploymentVersionInfo(parsed)) {
      throw new InvalidRouteParamValue()
    }

    return parsed
  }

  protected override format(value: DeploymentVersionInfo): LocationQueryValue {
    return JSON.stringify(value)
  }
}