import { SavedSearchFilterResponse, SavedSearchCreate } from '@/models/api/SavedSearchResponse'
import { SavedSearch, SavedSearchFilter } from '@/models/SavedSearch'
import { MapFunction } from '@/services/Mapper'

export const mapSavedSearchToSavedSearchCreate: MapFunction<SavedSearch, SavedSearchCreate> = function(source: SavedSearch): SavedSearchCreate {
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