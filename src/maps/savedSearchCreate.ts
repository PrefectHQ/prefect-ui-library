import { SavedSearchFilterResponse, SavedSearchCreateRequest } from '@/models/api/SavedSearchResponse'
import { SavedSearchFilter, SavedSearchCreate } from '@/models/SavedSearch'
import { MapFunction } from '@/services/Mapper'

export const mapSavedSearchCreateToSavedSearchCreateRequest: MapFunction<SavedSearchCreate, SavedSearchCreateRequest> = function(source: SavedSearchCreate): SavedSearchCreateRequest {
  return {
    name: source.name,
    filters: mapSavedSearchFiltersToSavedSearchCreate(source.filters),
  }
}

function mapSavedSearchFiltersToSavedSearchCreate(filters: SavedSearchFilter | undefined): SavedSearchFilterResponse[] {
  if (filters) {
    const values = Object.entries(filters)
    return values.map(([property, value]) => {
      return { property, value, object: 'flowRun', type: '', operation: '' }
    })
  }
  return []
}