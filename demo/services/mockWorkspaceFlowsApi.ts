import { KeyedDataStoreFindCallback } from './KeyedDataStore'
import { MockApi } from './MockApi'
import { Flow } from '@/models'
import { FlowsFilter } from '@/models/Filters'
import { IWorkspaceFlowsApi } from '@/services'

const flowsItemIntersectsFilter = (filter: FlowsFilter): KeyedDataStoreFindCallback<Flow> => {
  return (flow: Flow): boolean => {
    let filtered = false

    if (filter.flows?.id?.length) {
      filtered = !filter.flows.id.includes(flow.id)
    }

    if (!filtered && filter.flows?.name?.length && flow.name) {
      filtered = !filter.flows.name.includes(flow.name)
    }

    return !filtered
  }
}

export class MockWorkspaceFlowsApi extends MockApi implements IWorkspaceFlowsApi {

  public async getFlow(flowId: string): Promise<Flow> {
    return await this.flows.get(flowId)
  }

  /**
   * WARNING: Not all filter arguments have been implemented for the getFlows method... feel free to add any missing filters :)
  */
  public async getFlows(filter: FlowsFilter = {}): Promise<Flow[]> {
    const { limit = 200, offset = 0, sort = 'CREATED_DESC' } = filter
    let flows = await this.flows.findAll(flowsItemIntersectsFilter(filter))

    switch (sort) {
      /* eslint-disable id-length */
      case 'CREATED_DESC':
        flows = flows.sort((a, b) => b.created.getTime() - a.created.getTime())
        break
      case 'NAME_ASC':
        flows = flows.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'NAME_DESC':
        flows = flows.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        console.warn(`MockWorkspaceFlowsApi has not implemented the sort argument for ${sort} of the getFlows method`)
        break
      /* eslint-enable id-length */
    }

    flows = flows.slice(offset, offset + limit)
    return flows
  }

  /**
   * WARNING: Not all filter arguments have been implemented for the getFlowsCount method... feel free to add any missing filters :)
  */
  public async getFlowsCount(filter: FlowsFilter = {}): Promise<number> {
    return await this.flows.count(flowsItemIntersectsFilter(filter))
  }

  public async deleteFlow(flowId: string): Promise<void> {
    return await this.flows.delete(flowId)
  }
}
