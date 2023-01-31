import { StateHistoryResponse } from '@/models/api/StateHistoryResponse'
import { StateHistory } from '@/models/StateHistory'
import { MapFunction } from '@/services/Mapper'


export const mapStateHistoryResponseToStateHistory: MapFunction<StateHistoryResponse, StateHistory> = function(source) {
  return new StateHistory({
    stateType: this.map('ServerStateType', source.state_type, 'StateType'),
    stateName: source.state_name,
    countRuns: source.count_runs,
    sumEstimatedRunTime: source.sum_estimated_run_time,
    sumEstimatedLateness: source.sum_estimated_lateness,
  })
}

export const mapStateHistoryToStateHistoryResponse: MapFunction<StateHistory, StateHistoryResponse> = function(source) {
  return {
    state_type: this.map('StateType', source.stateType, 'ServerStateType'),
    state_name: source.stateName,
    count_runs: source.countRuns,
    sum_estimated_run_time: source.sumEstimatedRunTime,
    sum_estimated_lateness: source.sumEstimatedLateness,
  }
}