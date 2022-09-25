import { WorkspaceApi } from './WorkspaceApi'
import { SavedSearchResponse, SavedSearchCreate } from '@/models/api/SavedSearchResponse'
import { SavedSearch } from '@/models/SavedSearch'
import { mapper } from '@/services/Mapper'

export class WorkspaceSavedSearchesApi extends WorkspaceApi {

  protected routePrefix = '/saved_searches'

  public async getSavedSearches(filter = {}): Promise<SavedSearch[]> {
    const { data } = await this.post<SavedSearchResponse[]>('/filter', filter)

    return mapper.map('SavedSearchResponse', data, 'SavedSearch')
  }

  public getSavedSearch(id: string): Promise<SavedSearch> {
    return this.get<SavedSearch>(`/${id}`)
      .then(({ data }) => data)
  }

  public createSavedSearch(search: SavedSearchCreate): Promise<SavedSearch> {
    return this.put<SavedSearch>('/', search)
      .then(({ data }) => {
        return data
      })
  }

  public deleteSavedSearch(id: string): Promise<void> {
    return this.delete(`/${id}`)
  }

}

