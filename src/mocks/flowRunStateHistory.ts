import { StateHistory } from '@/models/StateHistory'
import { MockFunction } from '@/services/Mocker'

export const randomFlowRunStateHistory: MockFunction<StateHistory, [Partial<StateHistory>?]> = function(overrides = {}) {
  return new StateHistory({
    stateType: this.create('stateType'),
    stateName: this.create('string'),
    countRuns: this.create('number'),
    sumEstimatedLateness: this.create('number'),
    sumEstimatedRunTime: this.create('number'),
    ...overrides,
  })
}