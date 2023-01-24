import { FlowRunsFilter } from '@/models/Filters'
import { SavedSearchFilter } from '@/models/SavedSearch'
import { MapFunction } from '@/services/Mapper'
import { asArray } from '@/utilities/arrays'
import { parseDateTimeNumeric } from '@/utilities/dates'

export const mapSavedSearchFilterToFlowRunFilters: MapFunction<SavedSearchFilter, FlowRunsFilter> = function(source) {
  const flowIds = source.flow ? asArray(source.flow) : undefined
  const deploymentIds = source.deployment ? asArray(source.deployment) : undefined
  const tagNames = source.tag ? asArray(source.tag) : undefined
  const stateNames = source.state ? asArray(source.state) : undefined
  const startDate = source.startDate ? parseDateTimeNumeric(source.startDate) : undefined
  const endDate = source.endDate ? parseDateTimeNumeric(source.endDate) : undefined

  return {
    flows: {
      id: flowIds,
    },
    deployments: {
      id: deploymentIds,
    },
    flowRuns: {
      tags: {
        name: tagNames,
      },
      state: {
        name: stateNames,
      },
      expectedStartTimeAfter: startDate,
      nextExpectedStartTimeAfter: endDate,
    },
  }
}