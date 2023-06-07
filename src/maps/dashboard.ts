import { subSeconds } from 'date-fns'
import { TaskRunsFilter, TaskRunsHistoryFilter } from '@/models/Filters'
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
  }
}