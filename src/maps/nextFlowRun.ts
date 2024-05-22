
import { NextFlowRunResponse } from '@/models/api/NextFlowRunResponse'
import { NextFlowRun } from '@/models/NextFlowRun'
import { MapFunction } from '@/services/Mapper'

export const mapNextFlowRunResponseToNextFlowRun: MapFunction<NextFlowRunResponse, NextFlowRun> = function(source) {
  return {
    id: source.id,
    flowId: source.flow_id,
    name: source.name,
    stateName: source.state_name,
    stateType: this.map('ServerStateType', source.state_type, 'StateType'),
    nextScheduledStartTime: this.map('string', source.next_scheduled_start_time, 'Date'),
  }
}