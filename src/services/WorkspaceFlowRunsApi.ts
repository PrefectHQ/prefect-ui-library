import { TimelineData } from '@prefecthq/graphs'
import { StateUpdate } from '@/models'
import { FlowRunGraphResponse } from '@/models/api/FlowRunGraphResponse'
import { FlowRunHistoryResponse } from '@/models/api/FlowRunHistoryResponse'
import { FlowRunResponse } from '@/models/api/FlowRunResponse'
import { FlowRunsFilter, FlowRunsHistoryFilter } from '@/models/Filters'
import { FlowRun } from '@/models/FlowRun'
import { GraphNode } from '@/models/GraphNode'
import { RunHistory } from '@/models/RunHistory'
import { BatchProcessor } from '@/services/BatchProcessor'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'
import { toMap } from '@/utilities'
import { mapFlowRunGraphResponseToTimelineData } from '@/utilities/timeline'

export interface IWorkspaceFlowRunsApi {
  getFlowRun: (flowRunId: string) => Promise<FlowRun>,
  getFlowRuns: (filter: FlowRunsFilter) => Promise<FlowRun[]>,
  getFlowRunsCount: (filter: FlowRunsFilter) => Promise<number>,
  getFlowRunsHistory: (filter: FlowRunsHistoryFilter) => Promise<RunHistory[]>,
  getFlowRunsAverageLateness: (filter: FlowRunsFilter) => Promise<number | null>,
  getFlowRunsGraph: (flowRunId: string) => Promise<GraphNode[]>,
  getFlowRunsTimeline: (flowRunId: string) => Promise<TimelineData>,
  retryFlowRun: (flowRunId: string) => Promise<void>,
  setFlowRunState: (flowRunId: string, body: StateUpdate) => Promise<void>,
  resumeFlowRun: (flowRunId: string) => Promise<void>,
  deleteFlowRun: (flowRunId: string) => Promise<void>,
}

export class WorkspaceFlowRunsApi extends WorkspaceApi implements IWorkspaceFlowRunsApi {

  protected override routePrefix = '/flow_runs'

  private readonly batcher = new BatchProcessor<string, FlowRun>(async ids => {
    const flowRuns = await this.getFlowRuns({
      flowRuns: {
        id: ids,
      },
    })

    return toMap(flowRuns, 'id')
  }, { maxBatchSize: 200 })

  public getFlowRun(id: string): Promise<FlowRun> {
    return this.batcher.batch(id)
  }

  public async getFlowRuns(filter: FlowRunsFilter = {}): Promise<FlowRun[]> {
    const request = mapper.map('FlowRunsFilter', filter, 'FlowRunsFilterRequest')
    const { data } = await this.post<FlowRunResponse[]>('/filter', request)

    return mapper.map('FlowRunResponse', data, 'FlowRun')
  }

  public async getFlowRunsCount(filter: FlowRunsFilter = {}): Promise<number> {
    const request = mapper.map('FlowRunsFilter', filter, 'FlowRunsFilterRequest')
    const { data } = await this.post<number>('/count', request)

    return data
  }

  public async getFlowRunsHistory(filter: FlowRunsHistoryFilter): Promise<RunHistory[]> {
    const request = mapper.map('FlowRunsHistoryFilter', filter, 'FlowRunsHistoryFilterRequest')
    const { data } = await this.post<FlowRunHistoryResponse[]>('/history', request)

    return mapper.map('FlowRunHistoryResponse', data, 'RunHistory')
  }

  public async getFlowRunsAverageLateness(filter: FlowRunsFilter): Promise<number | null> {
    const request = mapper.map('FlowRunsFilter', filter, 'FlowRunsFilterRequest')
    const { data } = await this.post<number>('/lateness', request)

    return data
  }

  public async getFlowRunsGraph(flowRunId: string): Promise<GraphNode[]> {
    const { data } = await this.get<FlowRunGraphResponse[]>(`/${flowRunId}/graph`)

    return mapper.map('FlowRunGraphResponse', data, 'GraphNode')
  }

  public async getFlowRunsTimeline(id: string): Promise<TimelineData> {
    const { data } = await this.get<FlowRunGraphResponse[]>(`/${id}/graph`)

    const mapped = mapFlowRunGraphResponseToTimelineData(data)

    return mapped
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