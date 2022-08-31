import { mapper } from './Mapper'
import { WorkspaceApi } from './WorkspaceApi'
import { Flow, FlowResponse } from '@/models'
import { UnionFilters } from '@/types'

export class WorkspaceFlowsApi extends WorkspaceApi {

  protected override prefix = '/flows'

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