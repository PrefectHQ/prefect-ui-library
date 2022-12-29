import * as ResponseFilters from '@/models/api/UnionFilters'
import * as Filters from '@/models/UnionFilters'
import { MapFunction } from '@/services/Mapper'

export const mapAllToAll: MapFunction<Filters.FilterOperation.All, ResponseFilters.FilterOperation.all_> = function(source) {
  return { 'all_': source.all }
}
export const mapAnyToAny: MapFunction<Filters.FilterOperation.Any, ResponseFilters.FilterOperation.any_> = function(source) {
  return { 'any_': source.any }
}
export const mapLikeToLike: MapFunction<Filters.FilterOperation.Like, ResponseFilters.FilterOperation.like_> = function(source) {
  return { 'like_': source.like }
}
export const mapNotAnyToNotAny: MapFunction<Filters.FilterOperation.NotAny, ResponseFilters.FilterOperation.not_any_> = function(source) {
  return { 'not_any_': source.notAny }
}
export const mapEqualToEq: MapFunction<Filters.FilterOperation.Equal, ResponseFilters.FilterOperation.eq_> = function(source) {
  return { 'eq_': source.equal }
}
export const mapExistsToExists: MapFunction<Filters.FilterOperation.Exists, ResponseFilters.FilterOperation.exists_> = function(source) {
  return { 'exists_': source.exists }
}
export const mapIsNullToIsNull: MapFunction<Filters.FilterOperation.IsNull, ResponseFilters.FilterOperation.is_null_> = function(source) {
  return { 'is_null_': source.isNull }
}
export const mapBeforeToBefore: MapFunction<Filters.FilterOperation.Before, ResponseFilters.FilterOperation.before_> = function(source) {
  return { 'before_': source.before }
}
export const mapAfterToAfter: MapFunction<Filters.FilterOperation.After, ResponseFilters.FilterOperation.after_> = function(source) {
  return { 'after_': source.after }
}

export const mapFilterToFilter: MapFunction<Filters.Filter, ResponseFilters.Filter> = function(source) {
  return {
    'id': this.map('Any', source.id, 'Any'),
    'name': {
      ...this.map('Any', source.name, 'Any'),
      ...this.map('Like', source.name, 'Like'),
    },
    'tags': {
      ...this.map('All', source.tags, 'All'),
      ...this.map('IsNull', source.tags, 'IsNull'),
    },
    'operator': source.operator,
  }
}

export const mapDeploymentFilterToDeploymentFilter: MapFunction<Filters.DeploymentFilter, ResponseFilters.DeploymentFilter> = function(source) {
  return {
    ...this.map('Filter', source, 'Filter'),
    'is_schedule_active': this.map('Equal', source.isScheduleActive, 'Eq'),
  }
}

export const mapFlowFilterToFlowFilter: MapFunction<Filters.FlowFilter, ResponseFilters.FlowFilter> = function(source) {
  return this.map('Filter', source, 'Filter')
}

export const mapStateFilterToStateFilter: MapFunction<Filters.StateFilter, ResponseFilters.StateFilter> = function(source) {
  return {
    'type': this.map('Any', source.type, 'Any'),
    'name': this.map('Any', source.name, 'Any'),
    'operator': source.operator,
  }
}

export const mapTimeFrameFilterToTimeFrameFilter: MapFunction<Filters.TimeFrameFilter, ResponseFilters.TimeFrameFilter> = function(source) {
  return {
    ...this.map('Before', source, 'Before'),
    ...this.map('After', source, 'After'),
  }
}

export const mapTaskRunFilterToTaskRunFilter: MapFunction<Filters.TaskRunFilter, ResponseFilters.TaskRunFilter> = function(source) {
  return {
    ...this.map('Filter', source, 'Filter'),
    'id': {
      ...this.map('Any', source.id, 'Any'),
      ...this.map('NotAny', source.id, 'NotAny'),
    },
    'state': this.map('StateFilter', source.state, 'StateFilter'),
    'start_time': this.map('TimeFrameFilter', source.startTime, 'TimeFrameFilter'),
    'subflow_runs': this.map('Exists', source.subflowRuns, 'Exists'),
  }
}

export const mapFlowRunFilterToFlowRunFilter: MapFunction<Filters.FlowRunFilter, ResponseFilters.FlowRunFilter> = function(source) {
  return {
    ...this.map('Filter', source, 'Filter'),
    'id': {
      ...this.map('Any', source.id, 'Any'),
      ...this.map('NotAny', source.id, 'NotAny'),
    },
    'deployment_id': {
      ...this.map('Any', source.deploymentId, 'Any'),
      ...this.map('IsNull', source.deploymentId, 'IsNull'),
    },
    'state': this.map('StateFilter', source.state, 'StateFilter'),
    'flow_version': this.map('Any', source.flowVersion, 'Any'),
    'work_queue_name': this.map('Any', source.workQueueName, 'Any'),
    'start_time': this.map('TimeFrameFilter', source.startTime, 'TimeFrameFilter'),
    'expected_start_time': this.map('TimeFrameFilter', source.expectedStartTime, 'TimeFrameFilter'),
    'next_scheduled_start_time': this.map('TimeFrameFilter', source.nextScheduledStartTime, 'TimeFrameFilter'),
    'parent_task_run_id': {
      ...this.map('Any', source.parentTaskRunId, 'Any'),
      ...this.map('IsNull', source.parentTaskRunId, 'IsNull'),
    },
    'task_runs': this.map('TaskRunFilter', source.taskRuns, 'TaskRunFilter'),
  }
}

export const mapDeploymentsFilterToDeploymentsFilter: MapFunction<Filters.DeploymentsFilter, ResponseFilters.DeploymentsFilter> = function(source) {
  return {
    'deployments': this.map('DeploymentFilter', source.deployments, 'DeploymentFilter'),
  }
}

export const mapFlowsFilterToFlowsFilter: MapFunction<Filters.FlowsFilter, ResponseFilters.FlowsFilter> = function(source) {
  return {
    'flows': this.map('FlowFilter', source.flows, 'FlowFilter'),
  }
}

export const mapTaskRunsFilterToTaskRunsFilter: MapFunction<Filters.TaskRunsFilter, ResponseFilters.TaskRunsFilter> = function(source) {
  return {
    'task_runs': this.map('TaskRunFilter', source.taskRuns, 'TaskRunFilter'),
  }
}

export const mapFlowRunsFilterToFlowRunsFilter: MapFunction<Filters.FlowRunsFilter, ResponseFilters.FlowRunsFilter> = function(source) {
  return {
    'flow_runs': this.map('FlowRunFilter', source.flowRuns, 'FlowRunFilter'),
  }
}

export const mapUnionFiltersToUnionFilters: MapFunction<Filters.UnionFilters, ResponseFilters.UnionFilters> = function(source) {
  return {
    ...this.map('FlowsFilter', source, 'FlowsFilter'),
    ...this.map('DeploymentsFilter', source, 'DeploymentsFilter'),
    ...this.map('FlowRunsFilter', source, 'FlowRunsFilter'),
    ...this.map('TaskRunsFilter', source, 'TaskRunsFilter'),
    'sort': source.sort,
  }
}

export const mapFlowRunsHistoryFilterToFlowRunsHistoryFilter: MapFunction<Filters.FlowRunsHistoryFilter, ResponseFilters.FlowRunsHistoryFilter> = function(source) {
  return {
    ...this.map('UnionFilters', source, 'UnionFilters'),
    'history_start': this.map('Date', source.historyStart, 'string'),
    'history_end': this.map('Date', source.historyEnd, 'string'),
    'history_interval_seconds': source.historyIntervalSeconds,
  }
}

export const filterMaps = {
  All: { All: mapAllToAll },
  Any: { Any: mapAnyToAny },
  Like: { Like: mapLikeToLike },
  NotAny: { NotAny: mapNotAnyToNotAny },
  Equal: { Eq: mapEqualToEq },
  Exists: { Exists: mapExistsToExists },
  IsNull: { IsNull: mapIsNullToIsNull },
  Before: { Before: mapBeforeToBefore },
  After: { After: mapAfterToAfter },
  Filter: { Filter: mapFilterToFilter },
  DeploymentFilter: { DeploymentFilter: mapDeploymentFilterToDeploymentFilter },
  FlowFilter: { FlowFilter: mapFlowFilterToFlowFilter },
  StateFilter: { StateFilter: mapStateFilterToStateFilter },
  TimeFrameFilter: { TimeFrameFilter: mapTimeFrameFilterToTimeFrameFilter },
  TaskRunFilter: { TaskRunFilter: mapTaskRunFilterToTaskRunFilter },
  FlowRunFilter: { FlowRunFilter: mapFlowRunFilterToFlowRunFilter },
  DeploymentsFilter: { DeploymentsFilter: mapDeploymentsFilterToDeploymentsFilter },
  FlowsFilter: { FlowsFilter: mapFlowsFilterToFlowsFilter },
  TaskRunsFilter: { TaskRunsFilter: mapTaskRunsFilterToTaskRunsFilter },
  FlowRunsFilter: { FlowRunsFilter: mapFlowRunsFilterToFlowRunsFilter },
  UnionFilters: { UnionFilters: mapUnionFiltersToUnionFilters },
  FlowRunsHistoryFilter: { FlowRunsHistoryFilter: mapFlowRunsHistoryFilterToFlowRunsHistoryFilter },
}