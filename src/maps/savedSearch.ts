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
  console.log('filter mapper', filters)
  return { type: '', value: [] }
}