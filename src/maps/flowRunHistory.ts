import { FlowRunHistoryResponse } from '@/models/api/FlowRunHistoryResponse'
import { RunHistory } from '@/models/RunHistory'
import { MapFunction } from '@/services/Mapper'

export const mapFlowRunHistoryResponseToRunHistory: MapFunction<FlowRunHistoryResponse, RunHistory> = function(source) {
  return new RunHistory({
    intervalStart: this.map('string', source.interval_start, 'Date'),
    intervalEnd: this.map('string', source.interval_end, 'Date'),
    states: this.map('StateHistoryResponse', source.states, 'StateHistory'),
  })
}

export const mapRunHistoryToFlowRunHistoryResponse: MapFunction<RunHistory, FlowRunHistoryResponse> = function(source) {
  return {
    interval_start: this.map('Date', source.intervalStart, 'string'),
    interval_end: this.map('Date', source.intervalEnd, 'string'),
    states: this.map('StateHistory', source.states, 'StateHistoryResponse'),
  }
}