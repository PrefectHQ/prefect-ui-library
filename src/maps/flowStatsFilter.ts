import { subSeconds } from 'date-fns'
import { FlowRunsFilter, TaskRunsFilter } from '@/models'
import { MapFunction } from '@/services/Mapper'
import { FlowStatsFilter } from '@/types/flow'

export const mapFlowStatsFilterToFlowRunsFilter: MapFunction<FlowStatsFilter, FlowRunsFilter> = function(source) {


  const { startDate, endDate } = this.map('DateRangeSelectValue', source.range, 'DateRange')
  const filter: FlowRunsFilter = {
    flows: {
      id: [source.flowId],
    },
    flowRuns: {
      expectedStartTimeAfter: startDate,
      expectedStartTimeBefore: endDate,
    },
  }

  return filter
}

export const mapFlowStatsFilterToTaskRunsFilter: MapFunction<FlowStatsFilter, TaskRunsFilter> = function(source) {
  const now = new Date()

  return {
    flows: {
      id: [source.flowId],
    },
    taskRuns: {
      startTimeAfter: source.timeSpanInSeconds ? subSeconds(now, source.timeSpanInSeconds) : source.expectedStartTimeAfter,
      startTimeBefore: source.expectedStartTimeBefore ?? now,
    },
  }
}
