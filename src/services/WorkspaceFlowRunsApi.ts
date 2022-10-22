import { WorkspaceApi } from './WorkspaceApi'
import { StateDetails, StateResponse } from '@/models'
import { FlowRun } from '@/models/FlowRun'
import { FlowRunGraphResponse } from '@/models/FlowRunGraphResponse'
import { FlowRunHistoryResponse } from '@/models/FlowRunHistoryResponse'
import { FlowRunResponse } from '@/models/FlowRunResponse'
import { GraphNode } from '@/models/GraphNode'
import { RunHistory } from '@/models/RunHistory'
import { State } from '@/models/State'
import { mapper } from '@/services/Mapper'
import { FlowRunsHistoryFilter, UnionFilters } from '@/types/UnionFilters'

export class WorkspaceFlowRunsApi extends WorkspaceApi {

  protected routePrefix = '/flow_runs'

  public async getFlowRun(id: string): Promise<FlowRun> {
    const { data } = await this.get<FlowRunResponse>(`/${id}`)

    return mapper.map('FlowRunResponse', data, 'FlowRun')
  }

  public async getFlowRuns(filter: UnionFilters = {}): Promise<FlowRun[]> {
    const { data } = await this.post<FlowRunResponse[]>('/filter', filter)

    return mapper.map('FlowRunResponse', data, 'FlowRun')
  }

  public async getFlowRunsCount(filter: UnionFilters = {}): Promise<number> {
    const { data } = await this.post<number>('/count', filter)

    return data
  }

  public async getFlowRunsHistory(filter: FlowRunsHistoryFilter): Promise<RunHistory[]> {
    const { data } = await this.post<FlowRunHistoryResponse[]>('/history', filter)

    return mapper.map('FlowRunHistoryResponse', data, 'RunHistory')
  }

  public async getFlowRunsGraph(id: string): Promise<GraphNode[]> {
    const { data } = await this.get<FlowRunGraphResponse[]>(`/${id}/graph`)

    return mapper.map('FlowRunGraphResponse', data, 'GraphNode')
  }

  public setFlowRunState(id: string, body: State): Promise<State> {
    return this.post<StateResponse>(`/${id}/set_state`, body)
      .then(({ data }) => mapper.map('StateResponse', data, 'State'))
  }

  public deleteFlowRun(flowRunId: string): Promise<void> {
    return this.delete(`/${flowRunId}`)
  }
}