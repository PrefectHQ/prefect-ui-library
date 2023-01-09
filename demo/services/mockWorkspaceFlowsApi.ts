import { MockApi } from './MockApi'
import { Flow } from '@/models'
import { IWorkspaceFlowsApi } from '@/services'
import { UnionFilters } from '@/types'

export class MockWorkspaceFlowsApi extends MockApi implements IWorkspaceFlowsApi {

  public async getFlow(flowId: string): Promise<Flow> {
    console.log('MockWorkspaceFlowsApi.getFlow', flowId, this)
    return await this.flows.get(flowId)
  }

  public async getFlows(filter: UnionFilters = {}): Promise<Flow[]> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceFlowsApi has not implemented the filter argument of the getFlows method')
    }

    return await this.flows.getAll()
  }

  public async getFlowsCount(filter: UnionFilters = {}): Promise<number> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceFlowsApi has not implemented the filter argument of the getFlows method')
    }

    return await this.flows.count()
  }

  public async deleteFlow(flowId: string): Promise<void> {
    return await this.flows.delete(flowId)
  }
}
