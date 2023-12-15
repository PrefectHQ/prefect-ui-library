
export type SavedSearchResponse = {
  id: string,
  created?: string,
  updated?: string,
  name: string,
  filters?: SavedSearchFilterResponse[],
}

export type DateRangeSpanResponse = {
  type: 'span',
  seconds: number,
}

export function isDateRangeSpanResponse(value: unknown): value is DateRangeSpanResponse {
  return typeof value === 'object'
    && value !== null
    && 'type' in value
    && value.type === 'span'
    && 'seconds' in value
    && typeof value.seconds === 'number'
}

export type DateRangeRangeResponse = {
  type: 'range',
  startDate: string,
  endDate: string,
}

export function isDateRangeRangeResponse(value: unknown): value is DateRangeRangeResponse {
  return typeof value === 'object'
    && value !== null
    && 'type' in value
    && value.type === 'range'
    && 'startDate' in value
    && typeof value.startDate === 'string'
    && 'endDate' in value
    && typeof value.endDate === 'string'
}

export type DateRangeResponse = DateRangeSpanResponse | DateRangeRangeResponse

export function isDateRangeResponse(value: unknown): value is DateRangeRangeResponse {
  return isDateRangeSpanResponse(value) || isDateRangeRangeResponse(value)
}

export type FilterResponseValue = string | string[] | DateRangeResponse

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
