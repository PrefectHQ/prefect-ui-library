import { formatDateTimeNumeric, parseDateTimeNumeric } from '@prefecthq/prefect-design'
import { addDays, endOfToday, startOfToday, subDays } from 'date-fns'
import { SavedSearchFilter, SavedSearchResponse } from '@/models/api/SavedSearchResponse'
import { SavedSearch, SavedSearchMappedFilter } from '@/models/SavedSearch'
import { MapFunction } from '@/services/Mapper'


export const mapSavedSearchResponseToSavedSearch: MapFunction<SavedSearchResponse, SavedSearch> = function(source: SavedSearchResponse): SavedSearch {
  return new SavedSearch({
    id: source.id,
    name: source.name,
    filters: mapSavedSearchFilters(source.filters),
  })
}

function mapSavedSearchFilters(filters: SavedSearchFilter[] | undefined): SavedSearchMappedFilter {
  const filter = {
    states: [],
    tags: [],
    flows: [],
    deployments: [],
    startDate: parseDateTimeNumeric(formatDateTimeNumeric(subDays(startOfToday(), 7))),
    endDate: parseDateTimeNumeric(formatDateTimeNumeric(addDays(endOfToday(), 1))),
  }
  if (filters) {
    filter.flows = filters.find(filter => filter.property === 'flows')?.value ?? []
    filter.states = filters.find(filter => filter.property === 'states')?.value ?? []
  }
  return filter
}