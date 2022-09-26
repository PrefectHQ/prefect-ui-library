import { StateType } from './StateType'

export interface ISavedSearch {
  id: string,
  name: string,
  filters: SavedSearchMappedFilter,
}

export class SavedSearch implements ISavedSearch {
  public readonly id: string
  public name: string
  public filters: SavedSearchMappedFilter

  public constructor(savedSearch: ISavedSearch) {
    this.id = savedSearch.id
    this.name = savedSearch.name
    this.filters = savedSearch.filters
  }
}


export type SavedSearchMappedFilter = {
  states: StateType[],
  flows: string[],
  tags: string[],
  deployments: string[],
  startDate: string | Date,
  endDate: string | Date,


}
