import { MockApi } from './MockApi'
import { Flow } from '@/models'
import { FlowsFilter } from '@/models/Filters'
import { IWorkspaceFlowsApi } from '@/services'

export class MockWorkspaceFlowsApi extends MockApi implements IWorkspaceFlowsApi {

  public async getFlow(flowId: string): Promise<Flow> {
    return await this.flows.get(flowId)
  }

  public async getFlows(filter: FlowsFilter = {}): Promise<Flow[]> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceFlowsApi has not implemented the filter argument of the getFlows method')
    }

    return await this.flows.getAll()
  }

  public async getFlowsCount(filter: FlowsFilter = {}): Promise<number> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceFlowsApi has not implemented the filter argument of the getFlows method')
    }

    return await this.flows.count()
  }

  public async deleteFlow(flowId: string): Promise<void> {
    return await this.flows.delete(flowId)
  }
}
