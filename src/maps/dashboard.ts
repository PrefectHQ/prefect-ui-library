import { FlowRunsFilter, TaskRunsFilter, TaskRunsHistoryFilter, WorkPoolWorkersFilter } from '@/models/Filters'
import { MapFunction } from '@/services/Mapper'
import { WorkspaceDashboardFilter } from '@/types/dashboard'

export const mapWorkspaceDashboardFilterToTaskRunsFilter: MapFunction<WorkspaceDashboardFilter, TaskRunsFilter> = function(source) {
  const { startDate, endDate } = this.map('DateRangeSelectValue', source.range, 'DateRange')

  return {
    flowRuns: {
      tags: {
        name: source.tags,
      },
    },
    taskRuns: {
      startTimeAfter: startDate,
      startTimeBefore: endDate,
    },
  }
}

export const mapWorkspaceDashboardFilterToTaskRunsHistoryFilter: MapFunction<WorkspaceDashboardFilter, TaskRunsHistoryFilter> = function(source) {
  const { startDate, endDate, timeSpanInSeconds } = this.map('DateRangeSelectValue', source.range, 'DateRange')

  return {
    historyStart: startDate,
    historyEnd: endDate,
    historyIntervalSeconds: timeSpanInSeconds / 20,
    flowRuns: {
      tags: {
        name: source.tags,
      },
    },
  }
}

export const mapWorkspaceDashboardFilterToFlowRunsFilter: MapFunction<WorkspaceDashboardFilter, FlowRunsFilter> = function(source) {
  const { startDate, endDate } = this.map('DateRangeSelectValue', source.range, 'DateRange')

  const filter: FlowRunsFilter = {
    flowRuns: {
      expectedStartTimeAfter: startDate,
      expectedStartTimeBefore: endDate,
      tags: {
        name: source.tags,
      },
    },
  }

  return filter
}

export const mapWorkspaceDashboardFilterToWorkPoolWorkersFilter: MapFunction<WorkspaceDashboardFilter, WorkPoolWorkersFilter> = function(source) {
  const { startDate, endDate } = this.map('DateRangeSelectValue', source.range, 'DateRange')

  return {
    workers: {
      lastHeartbeatTimeAfter: startDate,
      lastHeartbeatTimeBefore: endDate,
    },
  }
}