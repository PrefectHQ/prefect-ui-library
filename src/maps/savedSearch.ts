import { SavedSearchFilterResponse, SavedSearchResponse } from '@/models/api/SavedSearchResponse'
import { SavedSearch, SavedSearchFilter } from '@/models/SavedSearch'
import { MapFunction } from '@/services/Mapper'
import { formatDateTimeNumeric } from '@/utilities/dates'
import { subDays, startOfToday, addDays, endOfToday } from '@/utilities/timezone'

export const mapSavedSearchResponseToSavedSearch: MapFunction<SavedSearchResponse, SavedSearch> = function(source: SavedSearchResponse): SavedSearch {
  return new SavedSearch({
    id: source.id,
    name: source.name,
    filters: mapSavedSearchFilters(source.filters),
  })
}

function mapSavedSearchFilters(filters: SavedSearchFilterResponse[] | undefined): SavedSearchFilter {
  const filter: SavedSearchFilter = {
    state: [],
    tag: [],
    flow: [],
    deployment: [],
    startDate: formatDateTimeNumeric(subDays(startOfToday(), 7)),
    endDate: formatDateTimeNumeric(addDays(endOfToday(), 1)),
  }
  if (filters) {
    filter.flow = filters.find(filter => filter.property === 'flow')?.value ?? []
    filter.state = filters.find(filter => filter.property === 'state')?.value ?? []
    filter.tag = filters.find(filter => filter.property === 'tag')?.value ?? []
    filter.deployment = filters.find(filter => filter.property === 'deployment')?.value ?? []
  }
  return filter
}