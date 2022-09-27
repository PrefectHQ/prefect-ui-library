// import { formatDateTimeNumeric, parseDateTimeNumeric } from '@prefecthq/prefect-design'
// import { addDays, endOfToday, startOfToday, subDays } from 'date-fns'

import { SavedSearchFilter, SavedSearchCreate } from '@/models/api/SavedSearchResponse'
import { SavedSearch, SavedSearchMappedFilter } from '@/models/SavedSearch'
import { MapFunction } from '@/services/Mapper'


export const mapSavedSearchToSavedSearchCreate: MapFunction<SavedSearch, SavedSearchCreate> = function(source: SavedSearch): SavedSearchCreate {
  return {
    name: source.name,
    filters: mapSavedSearchFiltersToSavedSearchCreate(source.filters),
  }
}

function mapSavedSearchFiltersToSavedSearchCreate(filters: SavedSearchMappedFilter | undefined): SavedSearchFilter[] {
  const values = Object.entries(filters!)
  const newFilters = values.map(filterList => {
    return { property: filterList[0], value: filterList[1], object: '', type: '', operation: '' }
  })
  return newFilters
}
