import { WorkspaceApi } from './WorkspaceApi'
import { SavedSearch, SavedSearchCreate, SavedSearchFilter } from '@/models/api/SavedSearch'

export class WorkspaceSavedSearchesApi extends WorkspaceApi {

  protected routePrefix = '/saved_searches'

  public async getSavedSearches(filter: SavedSearchFilter = {}): Promise<SavedSearch[]> {
    const { data } = await this.post<SavedSearch[]>('/filter', filter)

    return data
  }

  public getSavedSearch(id: string): Promise<SavedSearch> {
    return this.get<SavedSearch>(`/${id}`)
      .then(({ data }) => data)
  }

  public createSavedSearch(search: SavedSearchCreate): Promise<SavedSearch> {
    console.log('in saved')
    return this.put<SavedSearch>('/', search)
      .then(({ data }) => {
        console.log('data', data)
        return data
      })
  }


}
