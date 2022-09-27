import { StateType } from './StateType'

export interface ISavedSearch {
  id?: string,
  name: string,
  filters: SavedSearchMappedFilter,
}

export class SavedSearch implements ISavedSearch {
  public readonly id?: string | undefined
  public name: string
  public filters: SavedSearchMappedFilter

  public constructor(savedSearch: ISavedSearch) {
    this.id = savedSearch.id
    this.name = savedSearch.name
    this.filters = savedSearch.filters
  }
}


export type SavedSearchMappedFilter = {
  state?: StateType[],
  flow?: string[],
  tag?: string[],
  deployment?: string[],
  // startDate?: string | Date,
  // endDate?: string | Date,
}
