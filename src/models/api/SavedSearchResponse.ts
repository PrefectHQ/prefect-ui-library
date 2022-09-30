import { StateType } from '../StateType'

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any,
}

export type SavedSearchCreate = {
  name?: string,
  filters?: SavedSearchFilterResponse[],
}
