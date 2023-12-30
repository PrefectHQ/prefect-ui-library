import { Flow, FlowResponse } from '@/models'
import { FlowsFilter } from '@/models/Filters'
import { BatchProcessor } from '@/services/BatchProcessor'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'
import { toMap } from '@/utilities'

export class WorkspaceFlowsApi extends WorkspaceApi {

  protected override routePrefix = '/flows'

  private readonly batcher = new BatchProcessor<string, Flow>(async ids => {
    if (ids.length === 1) {
      const [id] = ids
      const { data } = await this.get<FlowResponse>(`${id}`)

      return () => mapper.map('FlowResponse', data, 'Flow')
    }

    const flows = await this.getFlows({
      flows: {
        id: ids,
      },
    })

    return toMap(flows, 'id')
  }, { maxBatchSize: 200 })

  public getFlow(flowId: string): Promise<Flow> {
    return this.batcher.batch(flowId)
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