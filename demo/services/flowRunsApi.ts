import { createActions } from '@prefecthq/vue-compositions'
import { InjectionKey } from 'vue'
import { MockedApi } from './MockedApi'
import { FlowRun } from '@/models/FlowRun'
import { RunHistory } from '@/models/RunHistory'
import { mocker } from '@/services'
import { UnionFilters, FlowRunsHistoryFilter } from '@/types/UnionFilters'

export class FlowRunsApi extends MockedApi {
  public getFlowRun(id: string): Promise<FlowRun> {
    return this.promise(mocker.create('flowRun', [{ id: id, name: 'ostentatious-axolotl' }]))
  }

  public getFlowRuns(filter: UnionFilters): Promise<FlowRun[]> {
    return this.promise(mocker.createMany('flowRun', 20))
  }

  public getFlowRunsCount(filter: UnionFilters): Promise<number> {
    return this.promise(20)
  }

  public getFlowRunsHistory(filter: FlowRunsHistoryFilter): Promise<RunHistory[]> {
    return this.promise(mocker.createMany('flowRunHistory', 15))
  }
}

export const flowRunsApiKey: InjectionKey<FlowRunsApi> = Symbol('flowRunsApiKey')
export const flowRunsApi = createActions(new FlowRunsApi())