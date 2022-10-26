import { createActions } from '@prefecthq/vue-compositions'
import { MockedApi } from './MockedApi'
import { Flow } from '@/models/Flow'
import { mocker } from '@/services'
import { UnionFilters } from '@/types/UnionFilters'

export class FlowsApi extends MockedApi {
  public getFlow(id: string): Promise<Flow> {
    return this.promise(mocker.create('flow', [{ id: id }]))
  }

  public getFlows(filter: UnionFilters): Promise<Flow[]> {
    return this.promise(mocker.createMany('flow', mocker.create('number', [1, 100])))
  }

  public deleteFlow(id: string): Promise<void> {
    return this.void()
  }
}

export const flowsApi = createActions(new FlowsApi())