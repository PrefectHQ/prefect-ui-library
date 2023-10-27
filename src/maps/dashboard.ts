import { subSeconds } from 'date-fns'
import { FlowRunsFilter, TaskRunsFilter, TaskRunsHistoryFilter, WorkPoolWorkersFilter } from '@/models/Filters'
import { MapFunction } from '@/services/Mapper'
import { WorkspaceDashboardFilter } from '@/types/dashboard'

function nowWithoutMilliseconds(): Date {
  const now = new Date()

  now.setMilliseconds(0)

  return now
}

export const mapWorkspaceDashboardFilterToTaskRunsFilter: MapFunction<WorkspaceDashboardFilter, TaskRunsFilter> = function(source) {
  const now = nowWithoutMilliseconds()

  return {
    flowRuns: {
      tags: {
        name: source.tags,
      },
    },
    taskRuns: {
      startTimeAfter: subSeconds(now, source.timeSpanInSeconds),
      startTimeBefore: now,
    },
  }
}

export const mapWorkspaceDashboardFilterToTaskRunsHistoryFilter: MapFunction<WorkspaceDashboardFilter, TaskRunsHistoryFilter> = function(source) {
  const now = nowWithoutMilliseconds()

  return {
    historyStart: subSeconds(now, source.timeSpanInSeconds),
    historyEnd: now,
    historyIntervalSeconds: source.timeSpanInSeconds / 20,
    flowRuns: {
      tags: {
        name: source.tags,
      },
    },
  }
}

export const mapWorkspaceDashboardFilterToFlowRunsFilter: MapFunction<WorkspaceDashboardFilter, FlowRunsFilter> = function(source) {
  const now = nowWithoutMilliseconds()
  const filter: FlowRunsFilter = {
    flowRuns: {
      expectedStartTimeAfter: subSeconds(now, source.timeSpanInSeconds),
      expectedStartTimeBefore: now,
      tags: {
        name: source.tags,
      },
    },
  }

  return filter
}

export const mapWorkspaceDashboardFilterToWorkPoolWorkersFilter: MapFunction<WorkspaceDashboardFilter, WorkPoolWorkersFilter> = function(source) {
  const now = nowWithoutMilliseconds()

  return {
    workers: {
      lastHeartbeatTimeAfter: subSeconds(now, source.timeSpanInSeconds),
      lastHeartbeatTimeBefore: now,
    },
  }
}