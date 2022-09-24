
export type SavedSearch = {
  id?: string,
  created?: string,
  updated?: string,
  name: string,
  filters?: SavedSearchFilter[],
}

export type SavedSearchFilter = {
  object?: string,
  property?: string,
  type?: string,
  operation?: string,
  value?: any,
}

export type SavedSearchCreate = {
  name?: string,
  filters?: SavedSearchFilter[],
}
