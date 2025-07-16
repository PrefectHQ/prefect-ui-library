import { RunGraphData } from '@prefecthq/graphs'
import { StateUpdate, SchemaResponse } from '@/models'
import { FlowRunHistoryResponse } from '@/models/api/FlowRunHistoryResponse'
import { FlowRunResponse } from '@/models/api/FlowRunResponse'
import { OrchestrationResult } from '@/models/api/OrchestrationResult'
import { OrchestrationResultResponse } from '@/models/api/OrchestrationResultResponse'
import { RunGraphDataResponse } from '@/models/api/RunGraphDataResponse'
import { FlowRunsFilter, FlowRunsHistoryFilter, FlowRunsPaginationFilter } from '@/models/Filters'
import { FlowRun } from '@/models/FlowRun'
import { FlowRunInputKeyset } from '@/models/FlowRunInputKeyset'
import { Paginated } from '@/models/pagination'
import { RunHistory } from '@/models/RunHistory'
import { SchemaResponseV2, SchemaV2, SchemaValuesV2 } from '@/schemas'
import { BatchProcessor } from '@/services/BatchProcessor'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'
import { Schema, SchemaValues } from '@/types/schemas'
import { toMap } from '@/utilities'

type GetFlowRunGraphOptions = {
  nestedTaskRunGraphs: boolean,
}

export class WorkspaceFlowRunsApi extends WorkspaceApi {

  protected override routePrefix = '/flow_runs'

  private readonly batcher = new BatchProcessor<string, FlowRun>(async ids => {
    if (ids.length === 1) {
      const [id] = ids
      const { data } = await this.get<FlowRunResponse>(`/${id}`)

      return () => mapper.map('FlowRunResponse', data, 'FlowRun')
    }

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

  public async getFlowRunsPaginated(filter: FlowRunsPaginationFilter = {}): Promise<Paginated<FlowRun>> {
    const request = mapper.map('FlowRunsPaginationFilter', filter, 'FlowRunsPaginationFilterRequest')
    const { data } = await this.post<Paginated<FlowRunResponse>>('/paginate', request)

    return mapper.map('FlowRunsPaginationResponse', data, 'FlowRunsPagination')
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

  public async getFlowRunsGraph(id: string, { nestedTaskRunGraphs }: GetFlowRunGraphOptions): Promise<RunGraphData> {
    const { data: graph } = await this.get<RunGraphDataResponse>(`/${id}/graph-v2`)

    return mapper.map('RunGraphDataResponse', { graph, nestedTaskRunGraphs }, 'RunGraphData')
  }

  public async getFlowRunInputDescription(id: string, keyset: FlowRunInputKeyset | undefined): Promise <string | null> {
    if (!keyset) {
      return null
    }

    try {
      const { data } = await this.get<string | null>(`/${id}/input/${keyset.description}`)
      return data
    } catch (error) {
      console.error('Flow run input description not found')
      return null
    }
  }

  public async getFlowRunInputSchema(id: string, keyset: FlowRunInputKeyset): Promise<Schema> {
    const { data } = await this.get<SchemaResponse>(`/${id}/input/${keyset.schema}`)

    return mapper.map('SchemaResponse', data, 'Schema')
  }

  public async getFlowRunInputSchemaV2(id: string, keyset: FlowRunInputKeyset): Promise<SchemaV2> {
    const { data } = await this.get<SchemaResponseV2>(`/${id}/input/${keyset.schema}`)

    return data
  }

  public retryFlowRun(id: string): Promise<void> {
    return this.setFlowRunState(id, {
      state: {
        type: 'scheduled',
        name: 'AwaitingRetry',
        message: 'Retry from the UI',
      },
    }, false)
  }

  public setFlowRunState(id: string, body: StateUpdate, force = true): Promise<void> {
    const requestBody = mapper.map('StateUpdate', body, 'StateUpdateRequest')
    return this.post(`/${id}/set_state`, { state: requestBody.state, force })
  }

  public async resumeFlowRun(id: string, values?: SchemaValues): Promise<OrchestrationResult> {
    if (values) {
      const { data } = await this.post<OrchestrationResultResponse>(`/${id}/resume`, { 'run_input': values })

      return mapper.map('OrchestrationResultResponse', data, 'OrchestrationResult')
    }

    const { data } = await this.post<OrchestrationResultResponse>(`/${id}/resume`)

    return mapper.map('OrchestrationResultResponse', data, 'OrchestrationResult')
  }

  public async resumeFlowRunV2(id: string, values: SchemaValuesV2): Promise<OrchestrationResult> {
    const { data } = await this.post<OrchestrationResultResponse>(`/${id}/resume`, { 'run_input': values })

    return mapper.map('OrchestrationResultResponse', data, 'OrchestrationResult')
  }

  public deleteFlowRun(flowRunId: string): Promise<void> {
    return this.delete(`/${flowRunId}`)
  }

  public async downloadFlowRunLogs(flowRunId: string, flowRunName: string | null): Promise<void> {
    const { data } = await this.get<string>(`/${flowRunId}/logs/download`, {
      responseType: 'stream',
    })

    const url = URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    const filename = flowRunName ?? 'logs'

    link.href = url
    link.setAttribute('download', `${filename}.csv`)
    link.click()

    URL.revokeObjectURL(url)
  }

  public async getFlowRunJobConfig(flowRunId: string): Promise<Record<string, unknown>> {
    const { data } = await this.get<Record<string, unknown>>(`${flowRunId}/job/config`)
    return data
  }
}
