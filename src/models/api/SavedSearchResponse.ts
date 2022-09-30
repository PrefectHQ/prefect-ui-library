
export type SavedSearchResponse = {
  id: string,
  created?: string,
  updated?: string,
  name: string,
  filters?: SavedSearchFilterResponse[],
}

export type SavedSearchFilterResponse = {
  object?: string,
  property?: string,
  type?: string,
  operation?: string,
  value?: unknown,
}

export type SavedSearchCreate = {
  name?: string,
  filters?: SavedSearchFilterResponse[],
}
