import { DateRangeSelectAroundUnit } from '@prefecthq/prefect-design'

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

export type DateRangePeriodResponse = {
  type: 'period',
  period: 'Today',
}

export function isDateRangePeriodResponse(value: unknown): value is DateRangePeriodResponse {
  return typeof value === 'object'
    && value !== null
    && 'type' in value
    && value.type === 'period'
    && 'period' in value
    && value.period === 'Today'
}

export type DateRangeAroundResponse = {
  type: 'around',
  date: string,
  quantity: number,
  unit: DateRangeSelectAroundUnit,
}

export function isDateRangeAroundResponse(value: unknown): value is DateRangeAroundResponse {
  return typeof value === 'object'
    && value !== null
    && 'type' in value
    && value.type === 'around'
    && 'date' in value
    && typeof value.date === 'string'
    && 'unit' in value
    && typeof value.unit === 'string'
}

export type DateRangeResponse = DateRangeSpanResponse | DateRangeRangeResponse | DateRangePeriodResponse | DateRangeAroundResponse

export function isDateRangeResponse(value: unknown): value is DateRangeResponse {
  return isDateRangeSpanResponse(value) || isDateRangeRangeResponse(value) || isDateRangePeriodResponse(value) || isDateRangeAroundResponse(value)
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
