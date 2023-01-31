
import { UiFlowRunHistoryResponse } from '@/models/api/UiFlowRunHistoryResponse'
import { UiFlowRunHistory } from '@/models/UiFlowRunHistory'
import { MapFunction } from '@/services/Mapper'

export const mapUiFlowRunHistoryResponseToUiFlowRunHistory: MapFunction<UiFlowRunHistoryResponse, UiFlowRunHistory> = function(source) {
  return {
    id: source.id,
    stateType: this.map('ServerStateType', source.state_type, 'StateType'),
    timestamp: this.map('string', source.timestamp, 'Date'),
    duration: source.duration,
    lateness: source.lateness,
  }
}