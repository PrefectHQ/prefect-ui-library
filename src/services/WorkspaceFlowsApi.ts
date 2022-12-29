import { Flow, FlowResponse } from '@/models'
import { UnionFilters } from '@/models/api/UnionFilters'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export interface IWorkspaceFlowsApi {
  getFlow: (flowId: string) => Promise<Flow>,
  getFlows: (filter: UnionFilters) => Promise<Flow[]>,
  getFlowsCount: (filter: UnionFilters) => Promise<number>,
  deleteFlow: (flowId: string) => Promise<void>,
}

export class WorkspaceFlowsApi extends WorkspaceApi implements IWorkspaceFlowsApi {

  protected override routePrefix = '/flows'

  public async getFlow(flowId: string): Promise<Flow> {
    const { data } = await this.get<FlowResponse>(`/${flowId}`)

    return mapper.map('FlowResponse', data, 'Flow')
  }

  public async getFlows(filter: UnionFilters = {}): Promise<Flow[]> {
    const { data } = await this.post<FlowResponse[]>('filter', filter)

    return mapper.map('FlowResponse', data, 'Flow')
  }

  public async getFlowsCount(filter: UnionFilters = {}): Promise<number> {
    const { data } = await this.post<number>('count', filter)

    return data
  }

  public deleteFlow(flowId: string): Promise<void> {
    return this.delete(`/${flowId}`)
  }

}