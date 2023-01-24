import { Flow, FlowResponse } from '@/models'
import { FlowsFilter } from '@/models/Filters'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export interface IWorkspaceFlowsApi {
  getFlow: (flowId: string) => Promise<Flow>,
  getFlows: (filter: FlowsFilter) => Promise<Flow[]>,
  getFlowsCount: (filter: FlowsFilter) => Promise<number>,
  deleteFlow: (flowId: string) => Promise<void>,
}

export class WorkspaceFlowsApi extends WorkspaceApi implements IWorkspaceFlowsApi {

  protected override routePrefix = '/flows'

  public async getFlow(flowId: string): Promise<Flow> {
    const { data } = await this.get<FlowResponse>(`/${flowId}`)

    return mapper.map('FlowResponse', data, 'Flow')
  }

  public async getFlows(filter: FlowsFilter = {}): Promise<Flow[]> {
    const request = mapper.map('FlowsFilter', filter, 'FlowsFilterRequest')
    const { data } = await this.post<FlowResponse[]>('filter', request)

    return mapper.map('FlowResponse', data, 'Flow')
  }

  public async getFlowsCount(filter: FlowsFilter = {}): Promise<number> {
    const request = mapper.map('FlowsFilter', filter, 'FlowsFilterRequest')
    const { data } = await this.post<number>('count', request)

    return data
  }

  public deleteFlow(flowId: string): Promise<void> {
    return this.delete(`/${flowId}`)
  }

}