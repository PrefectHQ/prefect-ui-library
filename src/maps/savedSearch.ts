import { DateRangeSelectAroundValue, DateRangeSelectRangeValue, DateRangeSelectSpanValue, DateRangeSelectValue, DateRangeSelectPeriodValue } from '@prefecthq/prefect-design'
import { LocationQuery } from 'vue-router'
import { SavedSearchFilterResponse, SavedSearchResponse, isDateRangeResponse, isDateRangeRangeResponse, isDateRangeAroundResponse, isDateRangeSpanResponse, isDateRangePeriodResponse } from '@/models/api/SavedSearchResponse'
import { SavedSearch, SavedSearchFilter } from '@/models/SavedSearch'
import { MapFunction, mapper } from '@/services/Mapper'
import { asArray, filterRangePastWeek, isString, isStringArray, mapStateTypeOrNameToStateName } from '@/utilities'

export const mapSavedSearchResponseToSavedSearch: MapFunction<SavedSearchResponse, SavedSearch> = function(source) {
  return new SavedSearch({
    id: source.id,
    name: source.name,
    filters: mapSavedSearchFilters(source.filters),
  })
}

export const mapSavedSearchToLocationQuery: MapFunction<SavedSearchFilter, LocationQuery> = function(filter) {
  const query: LocationQuery = {}

  if (filter.deployment.length) {
    query.deployment = filter.deployment
  }

  if (filter.flow.length) {
    query.flow = filter.flow
  }

  if (filter.workPool.length) {
    query.workPool = filter.workPool
  }

  if (filter.workQueue.length) {
    query.workQueue = filter.workQueue
  }

  if (filter.tag.length) {
    query.tag = filter.tag
  }

  if (filter.state.length) {
    query.state = filter.state
  }

  const { range } = filter

  switch (range.type) {
    case 'around':
      query.type = 'around'
      query.date = this.map('Date', range.date, 'string')
      query.unit = range.unit
      query.quantity = range.quantity.toString()
      break
    case 'period':
      query.type = 'period'
      query.period = range.period
      break
    case 'range':
      query.type = 'range'
      query.startDate = this.map('Date', range.startDate, 'string')
      query.endDate = this.map('Date', range.endDate, 'string')
      break
    case 'span':
      query.type = 'span'
      query.seconds = range.seconds.toString()
      break
    default:
      const exhaustive: never = range
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new Error(`Mapping saved search filters.range missing case for: ${(exhaustive as any).type}`)
  }

  return query
}

function mapSavedSearchFilters(filters: SavedSearchFilterResponse[] = []): SavedSearchFilter {
  const filter: SavedSearchFilter = {
    state: getStateFilter(filters),
    flow: getObjectFilter(filters, 'flow'),
    tag: getObjectFilter(filters, 'tag'),
    deployment: getObjectFilter(filters, 'deployment'),
    workQueue: getObjectFilter(filters, 'workQueue'),
    workPool: getObjectFilter(filters, 'workPool'),
    range: getRangeFilter(filters),
  }

  return filter
}

type SavedSearchProperty = 'flow' | 'tag' | 'deployment' | 'workQueue' | 'workPool' | 'state'

function getObjectFilter(filters: SavedSearchFilterResponse[], property: SavedSearchProperty): string[] {
  const filter = filters.find(filter => filter.property === property)

  if (!filter || !(isString(filter.value) || isStringArray(filter.value))) {
    return []
  }

  return asArray(filter.value)
}

function getStateFilter(filters: SavedSearchFilterResponse[]): string[] {
  const states = getObjectFilter(filters, 'state')

  return states.map(state => mapStateTypeOrNameToStateName(state))
}

function getRangeFilter(filters: SavedSearchFilterResponse[]): NonNullable<DateRangeSelectValue> {
  const filter = filters.find(filter => filter.property === 'range')

  if (!filter || !isDateRangeResponse(filter.value)) {
    return filterRangePastWeek
  }

  const range = filter.value

  if (isDateRangeRangeResponse(range)) {
    return {
      type: 'range',
      startDate: mapper.map('string', range.startDate, 'Date'),
      endDate: mapper.map('string', range.endDate, 'Date'),
    } satisfies DateRangeSelectRangeValue
  }

  if (isDateRangeAroundResponse(range)) {
    return {
      type: 'around',
      date: mapper.map('string', range.date, 'Date'),
      unit: range.unit,
      quantity: range.quantity,
    } satisfies DateRangeSelectAroundValue
  }

  if (isDateRangeSpanResponse(range)) {
    return range satisfies DateRangeSelectSpanValue
  }

  if (isDateRangePeriodResponse(range)) {
    return range satisfies DateRangeSelectPeriodValue
  }

  const exhaustive: never = range
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  throw new Error(`No handler for date range type: ${(exhaustive as any).type}`)
}