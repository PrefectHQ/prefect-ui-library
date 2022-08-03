import { IFlowRun, IFlowRunRequest, Parameters, IStateDetailsRequest, IState } from '@/models'

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
}

export class FlowRunFormValues {
  public name: string
  public state: IState
  public parameters?: Parameters
  public tags?: string[] | null

  //  & Pick<IFlowRun, 'name' | 'state' | 'tags'>
  public constructor(flowRun: DeepPartial<IFlowRun>) {
    this.name = flowRun.name!
    this.state = flowRun.state!
    this.parameters = flowRun.parameters
    this.tags = flowRun.tags
  }

  public getFlowRunRequest(): IFlowRunRequest {
    const stateDetails: IStateDetailsRequest = {}
    const scheduledTime = this.state.stateDetails?.scheduledTime
    if (scheduledTime) {
      // eslint-disable-next-line camelcase
      stateDetails.scheduled_time = scheduledTime.toISOString()
    }

    return {
      'name': this.name,
      'state': {
        message: this.state.message,
        type: this.state.type,
        name: this.state.name,
        'state_details': stateDetails,
      },
      'parameters': this.parameters,
      'tags': this.tags ?? undefined,
    }
  }
}