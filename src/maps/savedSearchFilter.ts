import { FlowRunsFilter } from '@/models/Filters'
import { SavedSearchFilter } from '@/models/SavedSearch'
import { MapFunction } from '@/services/Mapper'

export const mapSavedSearchFilterToFlowRunsFilter: MapFunction<SavedSearchFilter, FlowRunsFilter> = function(source) {
  const flowIds = source.flow?.length ? source.flow : undefined
  const deploymentIds = source.deployment?.length ? source.deployment : undefined
  const workPoolNames = source.workPool?.length ? source.workPool : undefined
  const tagNames = source.tag?.length ? source.tag : undefined
  const stateNames = source.state?.length ? source.state : undefined
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