import { IFlowRunner } from '@/models/FlowRunner'
import { MockFunction } from '@/services'

export const randomFlowRunner: MockFunction<IFlowRunner> = function(flowRunner?: Partial<IFlowRunner>) {
  const type = this.create('flowRunnerType')

  return {
    type: flowRunner?.type ?? type,
    config: flowRunner?.config ?? {},
  }
}