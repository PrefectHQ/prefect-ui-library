// import { InjectionKey } from 'vue'
// import { SavedSearch, SavedSearchCreate, SavedSearchFilter } from '@/models/api/SavedSearch'
// import { Api, ApiRoute } from '@/services/Api'

// export class SavedSearchesApi extends Api {

//   protected route: ApiRoute = '/saved_searches'

//   public getSavedSearch(id: string): Promise<SavedSearch> {
//     return this.get<SavedSearch>(`/${id}`)
//       .then(({ data }) => data)
//   }

//   public createSavedSearch(search: SavedSearchCreate): Promise<SavedSearch> {
//     console.log('in saved')
//     return this.post<SavedSearch>('', search)
//       .then(({ data }) => {
//         console.log('data', data)
//         return data
//       })
//   }

//   public getSavedSearches(filter: SavedSearchFilter = {}): Promise<SavedSearch[]> {
//     return this.post<SavedSearch[]>('/filter', filter)
//       .then(({ data }) => data)
//   }

//   public updateSavedSearch(id: string, search: SavedSearch): Promise<void> {
//     return this.patch(`/${id}`, search)
//   }

//   public deleteSavedSearch(id: string): Promise<void> {
//     return this.delete(`/${id}`)
//   }
// }

// /**
//  * @deprecated
//  */
// export const savedSearchesApiKey: InjectionKey<SavedSearchesApi> = Symbol('savedSearchesApiKey')