import { IFlowRunner } from '@/models/FlowRunner'
import { MockFunction } from '@/services'

export const randomFlowRunner: MockFunction<IFlowRunner, [Partial<IFlowRunner>?]> = function(overrides = {}) {
  const type = this.create('flowRunnerType')

  return {
    type: type,
    config: {},
    ...overrides,
  }
}