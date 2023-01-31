import { SavedSearchFilterResponse, SavedSearchResponse } from '@/models/api/SavedSearchResponse'
import { SavedSearch, SavedSearchFilter } from '@/models/SavedSearch'
import { MapFunction } from '@/services/Mapper'
import { asArray, mapStateTypeOrNameToStateName } from '@/utilities'
import { formatDateTimeNumeric } from '@/utilities/dates'
import { dateFunctions } from '@/utilities/timezone'

export const mapSavedSearchResponseToSavedSearch: MapFunction<SavedSearchResponse, SavedSearch> = function(source) {
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
    workQueue: [],
    startDate: formatDateTimeNumeric(dateFunctions.subDays(dateFunctions.startOfToday(), 7)),
    endDate: formatDateTimeNumeric(dateFunctions.addDays(dateFunctions.endOfToday(), 1)),
  }

  if (filters) {
    const state = filters.find(filter => filter.property === 'state')?.value ?? []
    const flow = filters.find(filter => filter.property === 'flow')?.value ?? []
    const tag = filters.find(filter => filter.property === 'tag')?.value ?? []
    const deployment = filters.find(filter => filter.property === 'deployment')?.value ?? []
    const workQueue = filters.find(filter => filter.property === 'workQueue')?.value ?? []

    filter.flow = asArray(flow)
    filter.deployment = asArray(deployment)
    filter.workQueue = asArray(workQueue)
    filter.tag = asArray(tag)

    filter.state = asArray(state).map(state => mapStateTypeOrNameToStateName(state))
  }

  return filter
}