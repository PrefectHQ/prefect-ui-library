import { StateUpdate, TimelineNode } from '@/models'
import { FlowRunGraphResponse } from '@/models/api/FlowRunGraphResponse'
import { FlowRunHistoryResponse } from '@/models/api/FlowRunHistoryResponse'
import { FlowRunResponse } from '@/models/api/FlowRunResponse'
import { FlowRun } from '@/models/FlowRun'
import { GraphNode } from '@/models/GraphNode'
import { RunHistory } from '@/models/RunHistory'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'
import { FlowRunsHistoryFilter, UnionFilters } from '@/types/UnionFilters'

export interface IWorkspaceFlowRunsApi {
  getFlowRun: (flowRunId: string) => Promise<FlowRun>,
  getFlowRuns: (filter: UnionFilters) => Promise<FlowRun[]>,
  getFlowRunsCount: (filter: UnionFilters) => Promise<number>,
  getFlowRunsHistory: (filter: FlowRunsHistoryFilter) => Promise<RunHistory[]>,
  getFlowRunsGraph: (flowRunId: string) => Promise<GraphNode[]>,
  getFlowRunsTimeline: (flowRunId: string) => Promise<TimelineNode[]>,
  retryFlowRun: (flowRunId: string) => Promise<void>,
  setFlowRunState: (flowRunId: string, body: StateUpdate) => Promise<void>,
  resumeFlowRun: (flowRunId: string) => Promise<void>,
  deleteFlowRun: (flowRunId: string) => Promise<void>,
}

export class WorkspaceFlowRunsApi extends WorkspaceApi implements IWorkspaceFlowRunsApi {

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

  public async getFlowRunsGraph(flowRunId: string): Promise<GraphNode[]> {
    const { data } = await this.get<FlowRunGraphResponse[]>(`/${flowRunId}/graph`)

    return mapper.map('FlowRunGraphResponse', data, 'GraphNode')
  }

  public async getFlowRunsTimeline(id: string): Promise<TimelineNode[]> {
    const { data } = await this.get<FlowRunGraphResponse[]>(`/${id}/graph`)

    return mapper.map('FlowRunGraphResponse', data, 'TimelineNode')
  }

  public retryFlowRun(id: string): Promise<void> {
    return this.setFlowRunState(id, {
      state: {
        type: 'scheduled',
        name: 'AwaitingRetry',
        message: 'Retry from the UI',
      },
    })
  }

  public setFlowRunState(id: string, body: StateUpdate): Promise<void> {
    const requestBody = mapper.map('StateUpdate', body, 'StateUpdateRequest')
    return this.post(`/${id}/set_state`, { state: requestBody.state, force: true })
  }

  public resumeFlowRun(id: string): Promise<void> {
    return this.post(`/${id}/resume`)
  }

  public deleteFlowRun(flowRunId: string): Promise<void> {
    return this.delete(`/${flowRunId}`)
  }
}