import { DataStore } from './dataStore'
import { FlowResponse, Flow } from '@/models'
import { WorkspaceFlowsApi, WorkspaceApiConfig, mapper } from '@/services'
import { UnionFilters } from '@/types'

export class MockWorkspaceFlowsApi extends WorkspaceFlowsApi {
  private readonly data: DataStore<FlowResponse>

  public constructor(config: WorkspaceApiConfig, seeds: FlowResponse[] = []) {
    super(config)

    this.data = new DataStore(seeds)
  }

  public override async getFlow(flowId: string): Promise<Flow> {
    const data = this.data.get(flowId)

    return await mapper.map('FlowResponse', data, 'Flow')
  }

  public override async getFlows(filter: UnionFilters = {}): Promise<Flow[]> {
    const data = this.data.getAll()

    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceFlowsApi has not implemented the filter argument of the getFlows method')
    }

    return await mapper.map('FlowResponse', data, 'Flow')
  }

  public override async getFlowsCount(filter: UnionFilters = {}): Promise<number> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceFlowsApi has not implemented the filter argument of the getFlows method')
    }

    return await this.data.count()
  }

  public override async deleteFlow(flowId: string): Promise<void> {
    return await this.data.delete(flowId)
  }
}
