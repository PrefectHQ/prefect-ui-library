import { UiFlowRunHistoryResponse } from '@/models/api/UiFlowRunHistoryResponse'
import { FlowRunsFilter } from '@/models/Filters'
import { UiFlowRunHistory } from '@/models/UiFlowRunHistory'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export interface IUiApi {
  getFlowRunHistory: (filter: FlowRunsFilter) => Promise<UiFlowRunHistory[]>,
}

export class UiApi extends WorkspaceApi implements IUiApi {
  protected override routePrefix = '/ui'

  public async getFlowRunHistory(filter: FlowRunsFilter): Promise<UiFlowRunHistory[]> {
    const request = mapper.map('FlowRunsFilter', filter, 'FlowRunsFilterRequest')
    const { data } = await this.post<UiFlowRunHistoryResponse[]>('/flow_runs/history', request)

    return mapper.map('UiFlowRunHistoryResponse', data, 'UiFlowRunHistory')
  }

}