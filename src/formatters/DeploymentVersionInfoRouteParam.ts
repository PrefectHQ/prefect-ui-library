import { InvalidRouteParamValue, RouteParam } from '@prefecthq/vue-compositions'
import { LocationQueryValue } from 'vue-router'
import { VersionInfoFilter, isVersionInfoFilter } from '@/models/Filters'

export class DeploymentVersionInfoRouteParam extends RouteParam<VersionInfoFilter> {
  protected override parse(value: LocationQueryValue): VersionInfoFilter {
    if (value === null || typeof value !== 'string') {
      throw new InvalidRouteParamValue()
    }

    const parsed = JSON.parse(value)

    if (!isVersionInfoFilter(parsed)) {
      throw new InvalidRouteParamValue()
    }

    return parsed
  }

  protected override format(value: VersionInfoFilter): LocationQueryValue {
    return JSON.stringify(value)
  }
}