import { WorkspaceApi } from './WorkspaceApi'
import { ConcurrencyLimitResponse } from '@/models/api/ConcurrencyLimitResponse'
import { ConcurrencyLimit } from '@/models/ConcurrencyLimit'
import { mapper } from '@/services/Mapper'


export class WorkspaceConcurrencyLimitsApi extends WorkspaceApi {

  protected routePrefix = '/concurrency_limit'

  public async getConcurrencyLimit(filter = {}): Promise<SavedSearch[]> {
    const { data } = await this.post<ConcurrencyLimitResponse[]>('/filter', filter)
    const mapped = mapper.map('ConcurrencyLimitResponse', data, 'ConcurrencyLimit')

    return [...defaultSavesSearches, ...mapped]
  }

  public async getConcurrencyLimit(id: string): Promise<ConcurrencyLimit> {
    const { data } = await this.get<ConcurrencyLimitResponse>(`/${id}`)
    return mapper.map('ConcurrencyLimitResponse', data, 'ConcurrencyLimit')
  }

  public async createConcurrencyLimit(search: ConcurrencyLimitCreate): Promise<ConcurrencyLimit> {
    const { data } = await this.put<ConcurrencyLimitResponse>('/', mapper.map('ConcurrencyLimitCreate', search, 'ConcurrencyLimitCreateRequest'))
    return mapper.map('ConcurrencyLimitResponse', data, 'ConcurrencyLimit')
  }

  public deleteConcurrencyLimit(id: string): Promise<void> {
    return this.delete(`/${id}`)
  }

}

