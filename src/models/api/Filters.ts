import { DeploymentSortValues, FlowRunSortValues, FlowSortValues, LogSortValues, TaskRunSortValues } from '@/types/SortOptionTypes'

/** A list where results will be returned only if they match all the values in the list */
type All = { all_?: string[] }

/** A list where results will be returned if any of the values are included in the list */
type Any = { any_?: string[] }
type Like = { like_?: string }
type StartsWith = { startswith_?: string[] }

/** A list where results will be returned if values don't match any in the list */
type NotAny = { not_any_?: string[] }

/** Matches on boolean equality */
type Equals = { eq_?: boolean }

/** Matches on boolean equality */
type Exists = { exists_?: boolean }

/** If true, returns results whose key is null */
type IsNull = { is_null_?: boolean }

/** A date-time string to include results starting at or before this time */
type Before = { before_?: string }
type After = { after_?: string }

type GreaterThan = { ge_?: number }
type LessThan = { le_?: number }

type Operation = 'and_' | 'or_'
type Operator = { operator: Operation }

type TagFilter = Operator & All & IsNull
type StateFilter = Operator & { type?: Any } & { name?: Any }

type FlowFilter = {
  operator?: Operation,
  id?: Any,
  name?: Any & Like,
  tags?: TagFilter,
}

type FlowRunFilter = {
  operator?: Operation,
  id?: Any & NotAny,
  name?: Any & Like,
  tags?: TagFilter,
  deployment_id?: Operator & Any & IsNull,
  work_queue_name?: Operator & Any & IsNull,
  state?: StateFilter,
  flow_version?: Any,
  start_time?: Before & After & IsNull,
  expected_start_time?: Before & After,
  next_scheduled_start_time?: Before & After,
  parent_task_run_id?: Operator & Any & IsNull,
}

type TaskRunFilter = {
  operator?: Operation,
  id?: Any,
  name?: Any & Like,
  tags?: TagFilter,
  state?: StateFilter,
  start_time?: Before & After & IsNull,
  subflow_runs?: Exists,
}

type DeploymentFilter = {
  operator?: Operation,
  id?: Any,
  name?: Any & Like,
  is_schedule_active?: Equals,
  work_queue_name?: Any,
}

type BlockTypeFilter = {
  name?: Like,
  slug?: Any,
}

type BlockSchemaFilter = {
  operator?: Operation,
  block_type_id?: Any,
  block_capabilities?: All,
  id?: Any,
  version?: Any,
}

type BlockDocumentFilter = {
  operator?: Operation,
  id?: Any,
  is_anonymous?: Equals,
  block_type_id?: Any,
  name?: Any,
}

export type FlowsFilterRequest = {
  flows?: FlowFilter,
  flow_runs?: FlowRunFilter,
  task_runs?: TaskRunFilter,
  deployments?: DeploymentFilter,
  sort?: FlowSortValues,
  offset?: number,
  limit?: number,
}

export type FlowRunsFilterRequest = {
  flows?: FlowFilter,
  flow_runs?: FlowRunFilter,
  task_runs?: TaskRunFilter,
  deployments?: DeploymentFilter,
  sort?: FlowRunSortValues,
  offset?: number,
  limit?: number,
}

export type TaskRunsFilterRequest = {
  flows?: FlowFilter,
  flow_runs?: FlowRunFilter,
  task_runs?: TaskRunFilter,
  deployments?: DeploymentFilter,
  sort?: TaskRunSortValues,
  offset?: number,
  limit?: number,
}

export type DeploymentsFilterRequest = {
  flows?: FlowFilter,
  flow_runs?: FlowRunFilter,
  task_runs?: TaskRunFilter,
  deployments?: DeploymentFilter,
  sort?: DeploymentSortValues,
  offset?: number,
  limit?: number,
}

export type NotificationsFilterRequest = {
  flow_run_notification_policy_filter?: {
    is_active?: Equals,
  },
  offset?: number,
  limit?: number,
}

export type SavedSearchesFilterRequest = {
  offset?: number,
  limit?: number,
}

export type LogsFilterRequest = {
  logs?: {
    operator?: Operation,
    level?: GreaterThan & LessThan,
    timestamp?: Before & After,
    flow_run_id?: Any,
    task_run_id?: Any,
  },
  sort?: LogSortValues,
  offset?: number,
  limit?: number,
}

export type ConcurrencyLimitsFilterRequest = {
  offset?: number,
  limit?: number,
}

export type BlockTypesFilterRequest = {
  block_types?: BlockTypeFilter,
  block_schemas?: BlockSchemaFilter,
  offset?: number,
  limit?: number,
}

export type BlockSchemasFilterRequest = {
  block_schemas?: BlockSchemaFilter,
  offset?: number,
  limit?: number,
}

export type BlockDocumentsFilterRequest = {
  block_documents?: BlockDocumentFilter,
  block_types?: BlockTypeFilter,
  block_schemas?: BlockSchemaFilter,
  include_secrets?: boolean,
  offset?: number,
  limit?: number,
}

export type WorkQueuesFilterRequest = {
  work_queues?: {
    operator?: Operation,
    name?: Any & StartsWith,
  },
  offset?: number,
  limit?: number,
}