import { ConcurrencyV2Response } from '@/models/api/ConcurrencyV2Response'
import { ConcurrencyV2Limit } from '@/models/ConcurrencyV2Limit'
import { ConcurrencyV2LimitCreate } from '@/models/ConcurrencyV2LimitCreate'
import { ConcurrencyLimitsFilter } from '@/models/Filters'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export interface IWorkspaceConcurrencyV2LimitsApi {
  getConcurrencyV2Limit: (concurrencyV2LimitId: string) => Promise<ConcurrencyV2Limit>,
  getConcurrencyV2Limits: (filter: ConcurrencyLimitsFilter) => Promise<ConcurrencyV2Limit[]>,
  createConcurrencyV2Limit: (concurrencyV2Limit: ConcurrencyV2LimitCreate) => Promise<ConcurrencyV2Limit>,
  getConcurrencyV2LimitByTag: (tag: string) => Promise<ConcurrencyV2Limit>,
  deleteConcurrencyV2Limit: (concurrencyV2LimitId: string) => Promise<void>,
  deleteConcurrencyV2LimitByTag: (tag: string) => Promise<void>,
}


export class WorkspaceConcurrencyV2LimitsApi extends WorkspaceApi {

  protected override routePrefix = '/concurrency_limits'

  public async getConcurrencyV2Limits(filter: ConcurrencyLimitsFilter = {}): Promise<ConcurrencyV2Limit[]> {
    const { data } = await this.post<ConcurrencyV2Response[]>('/filter', filter)
    return mapper.map('ConcurrencyV2Response', data, 'ConcurrencyV2Limit')
  }

  public async getConcurrencyV2Limit(id: string): Promise<ConcurrencyV2Limit> {
    const { data } = await this.get<ConcurrencyV2Response>(`/${id}`)
    return mapper.map('ConcurrencyV2LimitResponse', data, 'ConcurrencyV2Limit')
  }

  public async getConcurrencyV2LimitByTag(tag: string): Promise<ConcurrencyV2Limit> {
    const { data } = await this.get<ConcurrencyV2Response>(`/tag/${tag}`)
    return mapper.map('ConcurrencyV2LimitResponse', data, 'ConcurrencyV2Limit')
  }

  public async createConcurrencyV2Limit(limit: ConcurrencyV2LimitCreate): Promise<ConcurrencyV2Limit> {
    const { data } = await this.post<ConcurrencyV2Response>('/', mapper.map('ConcurrencyV2LimitCreate', limit, 'ConcurrencyV2LimitCreateRequest'))
    return mapper.map('ConcurrencyV2LimitResponse', data, 'ConcurrencyV2Limit')
  }

  public deleteConcurrencyV2Limit(id: string): Promise<void> {
    return this.delete(`/${id}`)
  }

}

