import { DateRangeSelectValue, isNotNullish } from '@prefecthq/prefect-design'
import { SavedSearchFilterResponse, SavedSearchCreateRequest, DateRangeResponse } from '@/models/api/SavedSearchResponse'
import { SavedSearchFilter, SavedSearchCreate } from '@/models/SavedSearch'
import { MapFunction } from '@/services/Mapper'
import { isEmptyArray } from '@/utilities/arrays'

export const mapSavedSearchCreateToSavedSearchCreateRequest: MapFunction<SavedSearchCreate, SavedSearchCreateRequest> = function(source) {
  return {
    name: source.name,
    filters: mapSavedSearchFiltersToSavedSearchCreate(source.filters),
  }
}

function mapSavedSearchFiltersToSavedSearchCreate(filters: SavedSearchFilter | undefined): SavedSearchFilterResponse[] {
  if (!filters) {
    return []
  }

  const values: SavedSearchFilterResponse[] = [
    getObjectFilter(filters, 'flow'),
    getObjectFilter(filters, 'tag'),
    getObjectFilter(filters, 'deployment'),
    getObjectFilter(filters, 'workPool'),
    getObjectFilter(filters, 'workQueue'),
    getObjectFilter(filters, 'workQueue'),
    getRangeFilter(filters.range),
  ].filter(isNotNullish)

  return values
}

type SavedSearchProperty = 'flow' | 'tag' | 'deployment' | 'workQueue' | 'workPool' | 'state'

function getObjectFilter(filters: SavedSearchFilter, property: SavedSearchProperty): SavedSearchFilterResponse | null {
  const value = filters[property]

  if (isEmptyArray(value)) {
    return null
  }

  return { property, value, object: 'flowRun', type: '', operation: '' }
}

function getRangeFilter(value: DateRangeSelectValue): SavedSearchFilterResponse | null {
  if (!value) {
    return null
  }

  return {
    property: 'range',
    value: getDateRangeResponse(value),
    object: 'flowRun',
    type: '',
    operation: '',
  }
}

function getDateRangeResponse(value: NonNullable<DateRangeSelectValue>): DateRangeResponse {
  if (value.type === 'range') {
    return { type: 'range', startDate: value.startDate.toISOString(), endDate: value.endDate.toISOString() }
  }

  return value
}