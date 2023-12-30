import { ConcurrencyLimitResponse } from '@/models/api/ConcurrencyLimitResponse'
import { ConcurrencyLimit } from '@/models/ConcurrencyLimit'
import { ConcurrencyLimitCreate } from '@/models/ConcurrencyLimitCreate'
import { ConcurrencyLimitsFilter } from '@/models/Filters'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export class WorkspaceConcurrencyLimitsApi extends WorkspaceApi {

  protected override routePrefix = '/concurrency_limits'

  public async getConcurrencyLimits(filter: ConcurrencyLimitsFilter = {}): Promise<ConcurrencyLimit[]> {
    const { data } = await this.post<ConcurrencyLimitResponse[]>('/filter', filter)
    return mapper.map('ConcurrencyLimitResponse', data, 'ConcurrencyLimit')
  }

  public async getConcurrencyLimit(id: string): Promise<ConcurrencyLimit> {
    const { data } = await this.get<ConcurrencyLimitResponse>(`/${id}`)
    return mapper.map('ConcurrencyLimitResponse', data, 'ConcurrencyLimit')
  }

  public async getConcurrencyLimitByTag(tag: string): Promise<ConcurrencyLimit> {
    const { data } = await this.get<ConcurrencyLimitResponse>(`/tag/${tag}`)
    return mapper.map('ConcurrencyLimitResponse', data, 'ConcurrencyLimit')
  }

  public async createConcurrencyLimit(limit: ConcurrencyLimitCreate): Promise<ConcurrencyLimit> {
    const { data } = await this.post<ConcurrencyLimitResponse>('/', mapper.map('ConcurrencyLimitCreate', limit, 'ConcurrencyLimitCreateRequest'))
    return mapper.map('ConcurrencyLimitResponse', data, 'ConcurrencyLimit')
  }

  public deleteConcurrencyLimit(id: string): Promise<void> {
    return this.delete(`/${id}`)
  }

  public deleteConcurrencyLimitByTag(tag: string): Promise<void> {
    return this.delete(`/tag/${tag}`)
  }

  public async resetConcurrencyLimitByTag(tag: string): Promise<ConcurrencyLimit> {
    const { data } = await this.post<ConcurrencyLimitResponse>(`/tag/${tag}/reset`)
    return mapper.map('ConcurrencyLimitResponse', data, 'ConcurrencyLimit')
  }

}

