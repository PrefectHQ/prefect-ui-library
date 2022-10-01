import { StateType } from '@/models/StateType'

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
  value?: string | string[] | StateType[],
}

export type SavedSearchCreateRequest = {
  name?: string,
  filters?: SavedSearchFilterResponse[],
}
