import { subSeconds } from 'date-fns'
import { FlowRunsFilter, TaskRunsFilter, TaskRunsHistoryFilter, WorkPoolWorkersFilter } from '@/models/Filters'
import { MapFunction } from '@/services/Mapper'
import { WorkspaceDashboardFilter } from '@/types/dashboard'

export const mapWorkspaceDashboardFilterToTaskRunsFilter: MapFunction<WorkspaceDashboardFilter, TaskRunsFilter> = function(source) {
  const now = new Date()

  return {
    taskRuns: {
      startTimeAfter: subSeconds(now, source.timeSpanInSeconds),
      startTimeBefore: now,
      tags: {
        name: source.tags,
      },
    },
  }
}

export const mapWorkspaceDashboardFilterToTaskRunsHistoryFilter: MapFunction<WorkspaceDashboardFilter, TaskRunsHistoryFilter> = function(source) {
  const now = new Date()

  return {
    historyStart: subSeconds(now, source.timeSpanInSeconds),
    historyEnd: now,
    historyIntervalSeconds: source.timeSpanInSeconds / 20,
    taskRuns: {
      tags: {
        name: source.tags,
      },
    },
  }
}

export const mapWorkspaceDashboardFilterToFlowRunsFilter: MapFunction<WorkspaceDashboardFilter, FlowRunsFilter> = function(source) {
  const now = new Date()
  const filter: FlowRunsFilter = {
    flowRuns: {
      startTimeAfter: subSeconds(now, source.timeSpanInSeconds),
      startTimeBefore: now,
      tags: {
        name: source.tags,
      },
    },
  }

  return filter
}

export const mapWorkspaceDashboardFilterToWorkPoolWorkersFilter: MapFunction<WorkspaceDashboardFilter, WorkPoolWorkersFilter> = function(source) {
  const now = new Date()

  return {
    workers: {
      lastHeartbeatTimeAfter: subSeconds(now, source.timeSpanInSeconds),
      lastHeartbeatTimeBefore: now,
    },
  }
}
