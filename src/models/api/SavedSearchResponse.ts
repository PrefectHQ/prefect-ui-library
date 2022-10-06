import { StateType } from '@/models/StateType'

export type SavedSearchResponse = {
  id: string,
  created?: string,
  updated?: string,
  name: string,
  filters?: SavedSearchFilterResponse[],
}

export type FilterResponseValue = string | string[] | StateType[]
export interface SavedSearchFilterResponse {
  object?: string,
  property?: string,
  type?: string,
  operation?: string,
  value?: FilterResponseValue,
}


export type SavedSearchCreateRequest = {
  name?: string,
  filters?: SavedSearchFilterResponse[],
}
