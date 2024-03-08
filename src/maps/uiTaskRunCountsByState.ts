import { UiTaskRunCountsByStateResponse } from '@/models/api/UiTaskRunCountsByStateResponse'
import { ServerStateType, isServerStateType } from '@/models/StateType'
import { UiTaskRunCountsByState } from '@/models/UiTaskRunCountsByState'
import { MapFunction, mapper } from '@/services/Mapper'

export const mapUiTaskRunCountsByStateResponseToUiTaskRunCountsByState: MapFunction<UiTaskRunCountsByStateResponse, UiTaskRunCountsByState> = function(source) {
  return Object.entries(source).reduce <UiTaskRunCountsByState>((acc, [key, value]) => {
    if (isServerStateType(key)) {
      acc[mapper.map('ServerStateType', key as ServerStateType, 'StateType')] = value
    }
    return acc
  }, {})
}