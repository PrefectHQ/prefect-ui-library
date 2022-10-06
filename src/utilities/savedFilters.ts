import { formatDateTimeNumeric } from '@prefecthq/prefect-design'
import { addDays, endOfToday, startOfToday, subDays } from 'date-fns'
import { Ref } from 'vue'
import { SavedSearchFilter } from '@/models/SavedSearch'
import { isSame } from '@/utilities/arrays'

export const defaultFilterValue = 'Default view'


// eslint-disable-next-line max-params
export function isCustomFilter(savedFilter: SavedSearchFilter, states: Ref<string[]>, flows: Ref<string[]>, deployments: Ref<string[]>, tags: Ref<string[]>): boolean {
  if (!savedFilter.state) {
    return true
  }
  if (!Array.isArray(savedFilter.state)) {
    return true
  }
  if (!isSame(states.value, savedFilter.state)) {
    return true
  }
  if (!savedFilter.flow) {
    return true
  }
  if (!Array.isArray(savedFilter.flow)) {
    return true
  }
  if (!isSame(flows.value, savedFilter.flow)) {
    return true
  }
  if (!savedFilter.tag) {
    return true
  }
  if (!Array.isArray(savedFilter.tag)) {
    return true
  }
  if (!isSame(tags.value, savedFilter.tag)) {
    return true
  }
  if (!savedFilter.deployment) {
    return true
  }
  if (!Array.isArray(savedFilter.deployment)) {
    return true
  }
  if (!isSame(deployments.value, savedFilter.deployment)) {
    return true
  }
  return false
}

export const oneWeekFilter = {
  startDate: formatDateTimeNumeric(subDays(startOfToday(), 7)),
  endDate: formatDateTimeNumeric(addDays(endOfToday(), 1)),
  state: [],
  flow: [],
  tag: [],
  deployment: [],
  id: null,
}

export const noScheduleFilter = {
  id: null,
  state: ['completed', 'failed', 'running', 'pending', 'crashed', 'cancelled'],
  flow: [],
  tag: [],
  deployment: [],
  startDate: formatDateTimeNumeric(subDays(startOfToday(), 7)),
  endDate: formatDateTimeNumeric(addDays(endOfToday(), 1)),
}

export type AdditionalFilter = {
  name: string,
  filters?: SavedSearchFilter,
  id: null,
}

export const additionalFilters: AdditionalFilter[] = [
  { name: 'Custom', id: null },
  {
    name: defaultFilterValue,
    filters: oneWeekFilter,
    id: null,
  },
  {
    name: 'No scheduled',
    filters: noScheduleFilter,
    id: null,
  },
]