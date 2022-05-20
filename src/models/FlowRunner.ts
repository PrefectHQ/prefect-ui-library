import { FlowRunnerType } from '@/types'

export interface IFlowRunner {
  type: FlowRunnerType,
  config: unknown,
}

export class FlowRunner implements IFlowRunner {
  public type: FlowRunnerType
  public config: unknown

  public constructor(flowRunner: IFlowRunner) {
    this.type = flowRunner.type
    this.config = flowRunner.config
  }
}