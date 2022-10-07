import { FilterResponseValue } from '@/models/api/SavedSearchResponse'

export interface ISavedSearch {
  id: string | null,
  name: string,
  filters: SavedSearchFilter,
}

export interface SavedSearchCreate {
  name: string,
  filters: SavedSearchFilter,
}

export class SavedSearch implements ISavedSearch {
  public readonly id: string | null
  public name: string
  public filters: SavedSearchFilter

  public constructor(savedSearch: ISavedSearch) {
    this.id = savedSearch.id
    this.name = savedSearch.name
    this.filters = savedSearch.filters
  }
}

export type SavedSearchFilter = {
  state?: FilterResponseValue,
  flow?: FilterResponseValue,
  tag?: FilterResponseValue,
  deployment?: FilterResponseValue,
  startDate?: FilterResponseValue,
  endDate?: FilterResponseValue,
}