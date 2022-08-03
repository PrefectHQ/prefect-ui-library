import { InjectionKey } from 'vue'
import { FlowRun } from '@/models/FlowRun'
import { GraphNode } from '@/models/GraphNode'
import { FlowRunGraphResponse } from '@/models/FlowRunGraphResponse'
import { FlowRunHistoryResponse } from '@/models/FlowRunHistoryResponse'
import { IFlowRunResponse } from '@/models/IFlowRunResponse'
import { RunHistory } from '@/models/RunHistory'
import { Api, ApiRoute } from '@/services/Api'
import { mapper } from '@/services/Mapper'
import { FlowRunsHistoryFilter, UnionFilters } from '@/types/UnionFilters'

export class FlowRunsApi extends Api {

  protected route: ApiRoute = '/flow_runs'

  public getFlowRun(id: string): Promise<FlowRun> {
    return this.get<IFlowRunResponse>(`/${id}`)
      .then(({ data }) => mapper.map('IFlowRunResponse', data, 'FlowRun'))
  }

  public getFlowRuns(filter: UnionFilters): Promise<FlowRun[]> {
    return this.post<IFlowRunResponse[]>('/filter', filter)
      .then(({ data }) => mapper.map('IFlowRunResponse', data, 'FlowRun'))
  }

  public getFlowRunsCount(filter: UnionFilters): Promise<number> {
    return this.post<number>('/count', filter).then(({ data }) => data)
  }

  public getFlowRunsHistory(filter: FlowRunsHistoryFilter): Promise<RunHistory[]> {
    return this.post<FlowRunHistoryResponse[]>('/history', filter)
      .then(({ data }) => mapper.map('FlowRunHistoryResponse', data, 'RunHistory'))
  }

  public getFlowRunsGraph(id: string): Promise<GraphNode[]> {
    return this.get<FlowRunGraphResponse[]>(`/${id}/graph`)
      .then(({ data }) => mapper.map('FlowRunGraphResponse', data, 'GraphNode'))
  }

  public deleteFlowRun(flowRunId: string): Promise<void> {
    return this.delete(`/${flowRunId}`)
  }
}

export const flowRunsApiKey: InjectionKey<FlowRunsApi> = Symbol('flowRunsApiKey')