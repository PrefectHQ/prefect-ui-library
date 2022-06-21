import { RunHistory } from '@/models/RunHistory'
import { MockFunction } from '@/services/Mocker'

export const randomFlowRunHistory: MockFunction<RunHistory, [Partial<RunHistory>?]> = function(overrides = {}) {
  return new RunHistory({
    intervalStart: this.create('date'),
    intervalEnd: this.create('date'),
    // todo: Make this mock more realistic
    // mocking this with createMany produces pretty random data that doesn't follow business rules around states
    states: this.createMany('flowRunStateHistory', this.create('number', [1, 5])),
    ...overrides,
  })
}