import { FlowResponse } from '@/models/api/FlowResponse'
import { MockFunction } from '@/services/Mocker'

export const randomFlowResponse: MockFunction<FlowResponse, [Partial<FlowResponse>?]> = function(overrides = {}) {
  return {
    id: this.create('id'),
    created: this.create('date').toISOString(),
    description: this.create('paragraph'),
    updated: this.create('date').toISOString(),
    name: this.create('noun'),
    ...overrides,
  }
}
