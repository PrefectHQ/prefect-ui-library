import { subHours } from 'date-fns'
import { TaskRunHistoryResponse, TaskRunHistoryStateResponse } from '@/models/api/TaskRunHistoryResponse'
import { TaskRunsFilter, TaskRunsHistoryFilter } from '@/models/Filters'
import { TaskRunHistory, TaskRunHistoryState } from '@/models/TaskRunHistory'
import { MapFunction } from '@/services/Mapper'

export const mapTaskRunHistoryStateResponseToTaskRunHistoryState: MapFunction<TaskRunHistoryStateResponse, TaskRunHistoryState> = function(source) {
  return {
    stateName: source.state_name,
    stateType: source.state_type,
    countRuns: source.count_runs,
    sumEstimatedLateness: source.sum_estimated_lateness,
    sumEstimatedRunTime: source.sum_estimated_run_time,
  }
}

export const mapTaskRunHistoryResponseToTaskRunHistory: MapFunction<TaskRunHistoryResponse, TaskRunHistory> = function(source) {
  return {
    intervalStart: this.map('string', source.interval_start, 'Date'),
    intervalEnd: this.map('string', source.interval_end, 'Date'),
    states: this.map('TaskRunHistoryStateResponse', source.states, 'TaskRunHistoryState'),
  }
}

export const mapTaskRunsFilterToTaskRunsHistoryFilter: MapFunction<TaskRunsFilter, TaskRunsHistoryFilter> = function(source) {
  const defaultTimeSpanHours = 24
  const now = new Date()

  const { flows, flowRuns, deployments, taskRuns } = source
  const {
    startTimeBefore = now,
    startTimeAfter = subHours(now, defaultTimeSpanHours),
  } = taskRuns ?? {}

  const timeSpanInSeconds = (startTimeBefore.getTime() - startTimeAfter.getTime()) / 1000

  return {
    flows,
    flowRuns,
    deployments,
    taskRuns,
    historyStart: startTimeAfter,
    historyEnd: startTimeBefore,
    historyIntervalSeconds: timeSpanInSeconds / 20,
  }
}