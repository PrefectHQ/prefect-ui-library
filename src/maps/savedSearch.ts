import { DateRangeSelectValue } from '@prefecthq/prefect-design'
import { secondsInWeek } from 'date-fns'
import { SavedSearchFilterResponse, SavedSearchResponse, isDateRangeResponse, isDateRangeRangeResponse } from '@/models/api/SavedSearchResponse'
import { SavedSearch, SavedSearchFilter } from '@/models/SavedSearch'
import { MapFunction, mapper } from '@/services/Mapper'
import { asArray, isString, isStringArray, mapStateTypeOrNameToStateName } from '@/utilities'

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

function getRangeFilter(filters: SavedSearchFilterResponse[]): DateRangeSelectValue {
  const filter = filters.find(filter => filter.property === 'range')

  if (!filter || !isDateRangeResponse(filter.value)) {
    return { type: 'span', seconds: -secondsInWeek }
  }

  if (isDateRangeRangeResponse(filter.value)) {
    return {
      type: 'range',
      startDate: mapper.map('string', filter.value.startDate, 'Date'),
      endDate: mapper.map('string', filter.value.endDate, 'Date'),
    }
  }

  return filter.value
}