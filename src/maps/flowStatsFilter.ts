import { subSeconds } from 'date-fns'
import { FlowRunsFilter, TaskRunsFilter } from '@/models'
import { MapFunction } from '@/services/Mapper'
import { FlowStatsFilter } from '@/types/flow'

export const mapFlowStatsFilterToFlowRunsFilter: MapFunction<FlowStatsFilter, FlowRunsFilter> = function(source) {
  const now = new Date()

  const filter: FlowRunsFilter = {
    flows: {
      id: [source.flowId],
    },
    flowRuns: {
      expectedStartTimeAfter: subSeconds(now, source.timeSpanInSeconds),
      expectedStartTimeBefore: now,
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
      startTimeAfter: subSeconds(now, source.timeSpanInSeconds),
      startTimeBefore: now,
    },
  }
}
