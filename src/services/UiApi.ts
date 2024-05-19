import { UiDeploymentsCountsByFlow } from '@/models/api/UiDeploymentsCountsByFlow'
import { UiFlowRunHistoryResponse } from '@/models/api/UiFlowRunHistoryResponse'
import { UiTaskRunCountsByStateResponse } from '@/models/api/UiTaskRunCountsByStateResponse'
import { FlowRunsFilter, TaskRunsFilter } from '@/models/Filters'
import { NextFlowRun } from '@/models/NextFlowRun'
import { UiFlowRunHistory } from '@/models/UiFlowRunHistory'
import { UiNextFlowRunByFlow } from '@/models/UiNextFlowRunByFlow'
import { UiNextFlowRunByFlowResponse } from '@/models/UiNextFlowRunByFlowResponse'
import { UiTaskRunCountsByState } from '@/models/UiTaskRunCountsByState'
import { BatchProcessor } from '@/services/BatchProcessor'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export interface IUiApi {
  getFlowRunHistory: (filter: FlowRunsFilter) => Promise<UiFlowRunHistory[]>,
}


export class UiApi extends WorkspaceApi implements IUiApi {
  protected override routePrefix = '/ui'

  private readonly nextRunsBatcher = new BatchProcessor<string, NextFlowRun>(async ids => {
    const runs = await this.getNextRunsByFlow(ids)
    return new Map(Object.entries(runs))
  }, { maxBatchSize: 200 })

  public async getFlowRunHistory(filter: FlowRunsFilter): Promise<UiFlowRunHistory[]> {
    const request = mapper.map('FlowRunsFilter', filter, 'FlowRunsFilterRequest')
    const { data } = await this.post<UiFlowRunHistoryResponse[]>('/flow_runs/history', request)

    return mapper.map('UiFlowRunHistoryResponse', data, 'UiFlowRunHistory')
  }

  public async getTaskRunsCountByState(filter: TaskRunsFilter): Promise<UiTaskRunCountsByState> {
    const request = mapper.map('TaskRunsFilter', filter, 'TaskRunsFilterRequest')
    const { data } = await this.post<UiTaskRunCountsByStateResponse>('/task_runs/count', request)

    return mapper.map('UiTaskRunCountsByStateResponse', data, 'UiTaskRunCountsByState')
  }

  public async getDeploymentsCountByFlow(flowIds: string[]): Promise<UiDeploymentsCountsByFlow> {
    const request = { 'flow_ids': flowIds }
    const { data } = await this.post<UiDeploymentsCountsByFlow>('/flows/count-deployments', request)

    return data
  }

  public async getNextRunsByFlow(flowIds: string[]): Promise<UiNextFlowRunByFlow> {
    const request = { 'flow_ids': new Set(flowIds).values() }
    const { data } = await this.post<UiNextFlowRunByFlowResponse>('/flows/next-runs', request)
    const runs = mapper.map('UiNextFlowRunByFlowResponse', data, 'UiNextFlowRunByFlow')

    return runs
  }

  public getNextRun(flowId: string): Promise<NextFlowRun> {
    return this.nextRunsBatcher.batch(flowId)
  }
}