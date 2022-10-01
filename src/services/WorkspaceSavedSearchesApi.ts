import { WorkspaceApi } from './WorkspaceApi'
import { SavedSearchResponse } from '@/models/api/SavedSearchResponse'
import { SavedSearch, SavedSearchCreate } from '@/models/SavedSearch'
import { mapper } from '@/services/Mapper'

export class WorkspaceSavedSearchesApi extends WorkspaceApi {

  protected routePrefix = '/saved_searches'

  public async getSavedSearches(filter = {}): Promise<SavedSearch[]> {
    const { data } = await this.post<SavedSearchResponse[]>('/filter', filter)

    return mapper.map('SavedSearchResponse', data, 'SavedSearch')
  }

  public async getSavedSearch(id: string): Promise<SavedSearch> {
    const { data } = await this.get<SavedSearchResponse>(`/${id}`)
    return mapper.map('SavedSearchResponse', data, 'SavedSearch')
  }

  public async createSavedSearch(search: SavedSearchCreate): Promise<SavedSearch> {
    const { data } = await this.put<SavedSearchResponse>('/', mapper.map('SavedSearchCreate', search, 'SavedSearchCreateRequest'))
    return mapper.map('SavedSearchResponse', data, 'SavedSearch')
  }

  public deleteSavedSearch(id: string): Promise<void> {
    return this.delete(`/${id}`)
  }

}

