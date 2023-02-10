import { InvalidRouteParamValue, RouteParam } from '@prefecthq/vue-compositions'
import { LocationQueryValue } from 'vue-router'
import { isTaskRunSortValue, TaskRunSortValues } from '@/types/SortOptionTypes'

export class TaskRunSortValuesSortParam extends RouteParam<TaskRunSortValues> {
  protected parse(value: LocationQueryValue): TaskRunSortValues {
    if (isTaskRunSortValue(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }

  protected format(value: TaskRunSortValues): LocationQueryValue {
    if (isTaskRunSortValue(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }
}
