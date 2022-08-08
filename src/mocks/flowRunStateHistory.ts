import { StateHistory } from '@/models/StateHistory'
import { MockFunction } from '@/services/Mocker'

export const randomFlowRunStateHistory: MockFunction<StateHistory, [Partial<StateHistory>?]> = function(overrides = {}) {
  const state = this.create('state')
  return new StateHistory({
    stateType: state.type,
    stateName: state.name,
    countRuns: this.create('number'),
    sumEstimatedLateness: this.create('number'),
    sumEstimatedRunTime: this.create('number'),
    ...overrides,
  })
}