import { StateType } from './StateType'

export interface ISavedSearch {
  id?: string,
  name: string,
  filters: SavedSearchFilter,
}

export class SavedSearch implements ISavedSearch {
  public readonly id?: string
  public name: string
  public filters: SavedSearchFilter

  public constructor(savedSearch: ISavedSearch) {
    this.id = savedSearch.id
    this.name = savedSearch.name
    this.filters = savedSearch.filters
  }
}


export type SavedSearchFilter = {
  state?: StateType[],
  flow?: string[],
  tag?: string[],
  deployment?: string[],
  startDate?: string,
  endDate?: string,
}
