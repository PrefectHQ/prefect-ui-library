import { FlowRunSortValues, FlowSortValues, TaskRunSortValues } from './SortOptionTypes'

/** A list where results will be returned only if they match all the values in the list */
type all_ = { all_?: string[] }

/** A list where results will be returned if any of the values are included in the list */
type any_ = { any_?: string[] }
type like_ = { like_?: string }

/** A list where results will be returned if values don't match any in the list */
type not_any_ = { not_any_?: string[] }

/** Matches on boolean equality */
type eq_ = { eq_?: boolean }

/** Matches on boolean equality */
type exists_ = { exists_?: boolean }

/** If true, returns results whose key is null */
type is_null_ = { is_null_?: boolean }

/** A date-time string to include results starting at or before this time */
type before_ = { before_?: string }

/** A date-time string to include results starting at or after this time */
type after_ = { after_?: string }

type operator_ = 'and_' | 'or_'

/**
 * @deprecated
 */
export interface Filter {
  id?: any_,
  name?: any_ & like_,
  tags?: all_ & is_null_,
  operator?: operator_,
}
/**
 * @deprecated
 */
export interface DeploymentFilter extends Filter {
  is_schedule_active?: eq_,
}
/**
 * @deprecated
 */
export type FlowFilter = Filter
/**
 * @deprecated
 */
export type StateFilter = {
  type?: any_,
  name?: any_,
  operator?: operator_,
}
/**
 * @deprecated
 */
export type TimeFrameFilter = before_ & after_
/**
 * @deprecated
 */
export interface FlowRunFilter extends Filter {
  id?: any_ & not_any_,
  deployment_id?: any_ & is_null_,
  state?: StateFilter,
  flow_version?: any_,
  work_queue_name?: any_,
  /**
   * Flow run actual starts
   */
  start_time?: TimeFrameFilter,
  /**
   * Flow run scheduled starts
   */
  expected_start_time?: TimeFrameFilter,
  next_scheduled_start_time?: TimeFrameFilter,
  parent_task_run_id?: any_ & is_null_,
  task_runs?: TaskRunFilter,
}
/**
 * @deprecated
 */
export interface TaskRunFilter extends Filter {
  id?: any_ & not_any_,
  state?: StateFilter,
  start_time?: TimeFrameFilter,
  subflow_runs?: exists_,
}
/**
 * @deprecated
 */
export type PaginatedFilter = {
  limit?: number,
  offset?: number,
}
/**
 * @deprecated
 */
type StringKeys<T extends Filter> = Extract<keyof T, string>
type Sortable<T extends Filter> = PaginatedFilter & {
  sort?: `${Uppercase<StringKeys<T>>}_${'ASC' | 'DESC'}`,
}
/**
 * @deprecated
 */
type RunSort<T extends string> = PaginatedFilter & {
  sort?: T,
}
/**
 * @deprecated
 */
export type DeploymentsFilter = { deployments?: DeploymentFilter }
/**
 * @deprecated
 */
export type FlowsFilter = { flows?: FlowFilter }
/**
 * @deprecated
 */
export type TaskRunsFilter = { task_runs?: TaskRunFilter }
/**
 * @deprecated
 */
export type FlowRunsFilter = { flow_runs?: FlowRunFilter }
/**
 * @deprecated
 */
export type UnionFilters =
  & FlowsFilter
  & DeploymentsFilter
  & FlowRunsFilter
  & TaskRunsFilter
  & (Sortable<FlowFilter & DeploymentFilter> | RunSort<FlowSortValues | FlowRunSortValues | TaskRunSortValues>)
/**
 * @deprecated
 */
interface Historical {
  history_start: string,
  history_end: string,
  history_interval_seconds: number,
}
/**
 * @deprecated
 */
export type FlowRunsHistoryFilter = UnionFilters & Historical