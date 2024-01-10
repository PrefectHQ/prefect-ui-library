import { isDefined } from '@prefecthq/prefect-design'
import { SavedSearchResponse } from '@/models/api/SavedSearchResponse'
import { SavedSearchesFilter } from '@/models/Filters'
import { SavedSearch, SavedSearchCreate } from '@/models/SavedSearch'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export class WorkspaceSavedSearchesApi extends WorkspaceApi {

  protected override routePrefix = '/saved_searches'

  public async getSavedSearches(filter: SavedSearchesFilter = {}): Promise<SavedSearch[]> {
    const request = mapper.map('SavedSearchesFilter', filter, 'SavedSearchesFilterRequest')
    const { data } = await this.post<SavedSearchResponse[]>('/filter', request)

    const mapped = data.map(savedSearch => {
      try {
        return mapper.map('SavedSearchResponse', savedSearch, 'SavedSearch')
      } catch (error) {
        console.error(error)
      }

      return undefined
    }).filter(isDefined)

    return mapped
  }

  public async getSavedSearch(id: string): Promise<SavedSearch> {
    const { data } = await this.get<SavedSearchResponse>(`/${id}`)
    return mapper.map('SavedSearchResponse', data, 'SavedSearch')
  }

  public async createSavedSearch(search: SavedSearchCreate): Promise<SavedSearch> {
    const request = mapper.map('SavedSearchCreate', search, 'SavedSearchCreateRequest')

    const { data } = await this.put<SavedSearchResponse>('/', request)
    return mapper.map('SavedSearchResponse', data, 'SavedSearch')
  }

  public deleteSavedSearch(id: string): Promise<void> {
    return this.delete(`/${id}`)
  }

}

