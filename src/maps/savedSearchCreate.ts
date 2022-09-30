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
  const values = Object.entries(filters!)
  const newFilters = values.map(filterList => {
    return { property: filterList[0], value: filterList[1], object: 'flowRun', type: '', operation: '' }
  })
  return newFilters
}
