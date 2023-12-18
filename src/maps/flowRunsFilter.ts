import { FlowRunsFilter } from '@/models/Filters'
import { SavedSearchFilter } from '@/models/SavedSearch'
import { MapFunction } from '@/services/Mapper'
import { asArray } from '@/utilities/arrays'

export const mapSavedSearchFilterToFlowRunsFilter: MapFunction<SavedSearchFilter, FlowRunsFilter> = function(source) {
  const flowIds = source.flow ? asArray(source.flow) : undefined
  const deploymentIds = source.deployment ? asArray(source.deployment) : undefined
  const workPoolNames = source.workPool ? asArray(source.workPool) : undefined
  const tagNames = source.tag ? asArray(source.tag) : undefined
  const stateNames = source.state ? asArray(source.state) : undefined
  const { startDate, endDate } = this.map('DateRangeSelectValue', source.range, 'DateRange')

  return {
    flows: {
      id: flowIds,
    },
    deployments: {
      id: deploymentIds,
    },
    workPools: {
      name: workPoolNames,
    },
    flowRuns: {
      tags: {
        name: tagNames,
      },
      state: {
        name: stateNames,
      },
      expectedStartTimeAfter: startDate,
      expectedStartTimeBefore: endDate,
    },
  }
}