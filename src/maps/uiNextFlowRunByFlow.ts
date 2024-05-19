
import { UiNextFlowRunByFlow } from '@/models/UiNextFlowRunByFlow'
import { UiNextFlowRunByFlowResponse } from '@/models/UiNextFlowRunByFlowResponse'
import { MapFunction } from '@/services/Mapper'

export const mapUiNextFlowRunByFlowResponseToUiNextFlowRunByFlow: MapFunction<UiNextFlowRunByFlowResponse, UiNextFlowRunByFlow> = function(source) {
  return Object.keys(source).reduce<UiNextFlowRunByFlow>((acc, key) => {
    acc[key] = this.map('NextFlowRunResponse', source[key], 'NextFlowRun')
    return acc
  }, {})
}