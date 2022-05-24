import { createActions } from '@prefecthq/vue-compositions'
import { MockedApi } from './MockedApi'
import { Flow } from '@/models/Flow'
import { mocker } from '@/services'

export class FlowsApi extends MockedApi {
  public getFlow(id: string): Promise<Flow> {
    return this.promise(mocker.create('flow', [{ id: id }]))
  }

  public getFlows(): Promise<Flow[]> {
    return this.promise(mocker.createMany('flow', mocker.create('number', [1, 100])))
  }
}

export const flowsApi = createActions(new FlowsApi())