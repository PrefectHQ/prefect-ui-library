import { ConcurrencyV2Response } from '@/models/api/ConcurrencyV2Response'
import { ConcurrencyV2ActiveSlots } from '@/models/ConcurrencyV2ActiveSlots'
import { ConcurrencyV2Create } from '@/models/ConcurrencyV2Create'
import { ConcurrencyV2Limit } from '@/models/ConcurrencyV2Limit'
import { ConcurrencyV2Update } from '@/models/ConcurrencyV2Update'
import { ConcurrencyLimitsFilter } from '@/models/Filters'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export interface IWorkspaceConcurrencyV2LimitsApi {
  getConcurrencyV2Limit: (concurrencyV2LimitId: string) => Promise<ConcurrencyV2Limit>,
  getConcurrencyV2Limits: (filter: ConcurrencyLimitsFilter) => Promise<ConcurrencyV2Limit[]>,
  createConcurrencyV2Limit: (concurrencyV2Limit: ConcurrencyV2Create) => Promise<ConcurrencyV2Limit>,
  updateConcurrencyV2Limit: (concurrencyV2Limit: ConcurrencyV2Update) => Promise<ConcurrencyV2Limit>,
  deleteConcurrencyV2Limit: (concurrencyV2LimitId: string) => Promise<void>,
  bulkIncrementActiveSlots: (names: string[], slots: number, mode: string) => Promise<void>,
  bulkDecrementActiveSlots: (names: string[], slots: number, mode: string) => Promise<void>,
}


export class WorkspaceConcurrencyV2LimitsApi extends WorkspaceApi {

  protected override routePrefix = '/concurrency_limits'

  public async getConcurrencyV2Limits(filter: ConcurrencyLimitsFilter = {}): Promise<ConcurrencyV2Limit[]> {
    const { data } = await this.post<ConcurrencyV2Response[]>('/filter', filter)
    return mapper.map('ConcurrencyV2LimitResponse', data, 'ConcurrencyV2Limit')
  }

  public async getConcurrencyV2Limit(id: string): Promise<ConcurrencyV2Limit> {
    const { data } = await this.get<ConcurrencyV2Response>(`/${id}`)
    return mapper.map('ConcurrencyV2LimitResponse', data, 'ConcurrencyV2Limit')
  }

  public async createConcurrencyV2Limit(limit: ConcurrencyV2Create): Promise<ConcurrencyV2Limit> {
    const { data } = await this.post<ConcurrencyV2Response>('/', mapper.map('ConcurrencyV2LimitCreate', limit, 'ConcurrencyV2LimitCreateRequest'))
    return mapper.map('ConcurrencyV2LimitResponse', data, 'ConcurrencyV2Limit')
  }

  public async updateConcurrencyV2Limit(limit: ConcurrencyV2Update): Promise<ConcurrencyV2Limit> {
    const { data } = await this.post<ConcurrencyV2Response>('/', mapper.map('ConcurrencyV2LimitUpdate', limit, 'ConcurrencyV2LimitUpdateRequest'))
    return mapper.map('ConcurrencyV2LimitResponse', data, 'ConcurrencyV2Limit')
  }

  public deleteConcurrencyV2Limit(id: string): Promise<void> {
    return this.delete(`/${id}`)
  }

  public async bulkIncrementActiveSlots(names: string[], slots: number, mode: string): Promise<ConcurrencyV2ActiveSlots> {
    const { data } = await this.post<ConcurrencyV2ActiveSlots>('/bulk_increment', { names, slots, mode })
    return data
  }

  public async bulkDecrementActiveSlots(names: string[], slots: number, mode: string): Promise<ConcurrencyV2ActiveSlots> {
    const { data } = await this.post<ConcurrencyV2ActiveSlots>('/bulk_decrement', { names, slots, mode })
    return data
  }
}
