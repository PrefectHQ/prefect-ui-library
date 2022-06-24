import { UiFlowRunHistory } from '@/models'
import { MockFunction } from '@/services/Mocker'

export const randomUiFlowRunHistory: MockFunction<UiFlowRunHistory, [Partial<UiFlowRunHistory>?]> = function(overrides = {}) {
  return {
    id: this.create('string'),
    stateType: this.create('stateType'),
    duration: this.create('number', [1, 200]),
    lateness: this.create('number', [1, 200]),
    timestamp: this.create('date'),
    ...overrides,
  }
}