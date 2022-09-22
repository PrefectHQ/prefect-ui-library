import { InjectionKey } from 'vue'
import { SavedSearch } from '@/models/api/NotificationResponse'
import { Api, ApiRoute } from '@/services/Api'

/**
 * @deprecated
 */
export class SavedSearchesApi extends Api {

  protected route: ApiRoute = '/saved_searches'

  public getSavedSearch(id: string): Promise<SavedSearch> {
    return this.get<SavedSearch>(`/${id}`)
      .then(({ data }) => data)
  }

  public createSavedSearch(search: SavedSearch): Promise<SavedSearch> {
    return this.post<SavedSearch>('/', search)
      .then(({ data }) => data)
  }

  public getSavedSearches(filter = {}): Promise<SavedSearch[]> {
    return this.post<SavedSearch[]>('/filter', filter)
      .then(({ data }) => data)
  }

  public updateSavedSearch(id: string, search: SavedSearch): Promise<void> {
    return this.patch(`/${id}`, search)
  }

  public deleteSavedSearch(id: string): Promise<void> {
    return this.delete(`/${id}`)
  }
}

/**
 * @deprecated
 */
export const savedSearchesApiKey: InjectionKey<SavedSearchesApi> = Symbol('savedSearchesApiKey')