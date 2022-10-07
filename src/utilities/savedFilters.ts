import { formatDateTimeNumeric } from '@prefecthq/prefect-design'
import { addDays, endOfToday, startOfToday, subDays } from 'date-fns'
import { SavedSearchFilter } from '@/models/SavedSearch'
import { asArray, isSame } from '@/utilities/arrays'

// eslint-disable-next-line max-params
export function isSameFilter(savedFilter: SavedSearchFilter, states?: string[], flows?: string[], deployments?: string[], tags?: string[]): boolean {
  if (!isSame(asArray(states), asArray(savedFilter.state))) {
    return false
  }

  if (!isSame(asArray(flows), asArray(savedFilter.flow))) {
    return false
  }

  if (!isSame(asArray(tags), asArray(savedFilter.tag))) {
    return false
  }

  if (!isSame(asArray(deployments), asArray(savedFilter.deployment))) {
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

export const customSavedSearch = {
  id: null,
  name: 'Custom',
  filters: null,
}

export const defaultSavedSearch = {
  id: null,
  name: 'Default view',
  filters: oneWeekFilter,
}

export const excludeScheduledSavedSearch = {
  id: null,
  name: 'No scheduled',
  filters: noScheduleFilter,
}