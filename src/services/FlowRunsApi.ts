import { InjectionKey } from 'vue'
import { FlowRun } from '@/models/FlowRun'
import { FlowRunGraphResponse } from '@/models/FlowRunGraphResponse'
import { FlowRunHistoryResponse } from '@/models/FlowRunHistoryResponse'
import { FlowRunResponse } from '@/models/FlowRunResponse'
import { GraphNode } from '@/models/GraphNode'
import { RunHistory } from '@/models/RunHistory'
import { Api, ApiRoute } from '@/services/Api'
import { mapper } from '@/services/Mapper'
import { FlowRunsHistoryFilter, UnionFilters } from '@/types/UnionFilters'

/**
 * @deprecated
 */
export class FlowRunsApi extends Api {

  protected route: ApiRoute = '/flow_runs'

  public getFlowRun(id: string): Promise<FlowRun> {
    return this.get<FlowRunResponse>(`/${id}`)
      .then(({ data }) => mapper.map('FlowRunResponse', data, 'FlowRun'))
  }

  public getFlowRuns(filter: UnionFilters): Promise<FlowRun[]> {
    return this.post<FlowRunResponse[]>('/filter', filter)
      .then(({ data }) => mapper.map('FlowRunResponse', data, 'FlowRun'))
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

/**
 * @deprecated
 */
export const flowRunsApiKey: InjectionKey<FlowRunsApi> = Symbol('flowRunsApiKey')