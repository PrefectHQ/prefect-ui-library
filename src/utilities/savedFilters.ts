import { addDays, endOfToday, startOfToday, subDays } from 'date-fns'
import { SavedSearch, SavedSearchFilter } from '@/models/SavedSearch'
import { asArray, isSame } from '@/utilities/arrays'
import { formatDateTimeNumeric } from '@/utilities/dates'

export function isSameFilter(filterA: SavedSearchFilter, filterB: SavedSearchFilter): boolean {
  if (!isSame(asArray(filterA.state), asArray(filterB.state))) {
    return false
  }

  if (!isSame(asArray(filterA.flow), asArray(filterB.flow))) {
    return false
  }

  if (!isSame(asArray(filterA.tag), asArray(filterB.tag))) {
    return false
  }

  if (!isSame(asArray(filterA.deployment), asArray(filterB.deployment))) {
    return false
  }

  return true
}

export const oneWeekFilter: SavedSearchFilter = {
  startDate: formatDateTimeNumeric(subDays(startOfToday(), 7)),
  endDate: formatDateTimeNumeric(addDays(endOfToday(), 1)),
  state: [],
  flow: [],
  tag: [],
  deployment: [],
}

export const noScheduleFilter: SavedSearchFilter = {
  state: ['completed', 'failed', 'running', 'pending', 'crashed', 'cancelled'],
  flow: [],
  tag: [],
  deployment: [],
  startDate: formatDateTimeNumeric(subDays(startOfToday(), 7)),
  endDate: formatDateTimeNumeric(addDays(endOfToday(), 1)),
}

export const customSavedSearch = new SavedSearch({
  id: null,
  name: 'Custom',
  filters: {},
})

export const oneWeekSavedSearch = new SavedSearch({
  id: null,
  name: 'Default view',
  filters: oneWeekFilter,
})

export const excludeScheduledSavedSearch = new SavedSearch({
  id: null,
  name: 'No scheduled',
  filters: noScheduleFilter,
})

export const defaultSavesSearches = [
  customSavedSearch,
  oneWeekSavedSearch,
  excludeScheduledSavedSearch,
]