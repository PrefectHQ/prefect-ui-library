
import { FlowRunsFilter, TaskRunsFilter } from '@/models'
import { MapFunction } from '@/services/Mapper'
import { FlowStatsFilter } from '@/types/flow'

export const mapFlowStatsFilterToFlowRunsFilter: MapFunction<FlowStatsFilter, FlowRunsFilter> = function(source) {
  const range = source.range ? this.map('DateRangeSelectValue', source.range, 'DateRange') : null

  const filter: FlowRunsFilter = {
    flows: {
      id: [source.flowId],
    },
    flowRuns: {
      expectedStartTimeAfter: range?.startDate,
      expectedStartTimeBefore: range?.endDate ?? new Date(),
    },
  }

  return filter
}

export const mapFlowStatsFilterToTaskRunsFilter: MapFunction<FlowStatsFilter, TaskRunsFilter> = function(source) {
  const range = source.range ? this.map('DateRangeSelectValue', source.range, 'DateRange') : null

  return {
    flows: {
      id: [source.flowId],
    },
    taskRuns: {
      startTimeAfter: range?.startDate,
      startTimeBefore: range?.endDate ?? new Date(),
    },
  }
}
