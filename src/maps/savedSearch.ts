import { DateRangeSelectAroundValue, DateRangeSelectRangeValue, DateRangeSelectSpanValue, DateRangeSelectValue, DateRangeSelectPeriodValue } from '@prefecthq/prefect-design'
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