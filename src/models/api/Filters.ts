import { ArtifactSortValues, DeploymentSortValues, FlowRunSortValues, FlowSortValues, LogSortValues, TaskRunSortValues, VariableSortValues } from '@/types/SortOptionTypes'

/** A list where results will be returned only if they match all the values in the list */
export type All = { all_?: string[] }

/** A list where results will be returned if any of the values are included in the list */
export type Any = { any_?: string[] }
export type Like = { like_?: string }
export type StartsWith = { startswith_?: string[] }

/** A list where results will be returned if values don't match any in the list */
export type NotAny = { not_any_?: string[] }

/** Matches on boolean equality */
export type Equals = { eq_?: boolean }
export type NullableEquals = { eq_?: boolean | null }

/** Matches on boolean equality */
export type Exists = { exists_?: boolean }

/** Matches on boolean equality */
export type Latest = { is_latest: boolean }

/** If true, returns results whose key is null */
export type IsNull = { is_null_?: boolean }

/** A date-time string to include results starting at or before this time */
export type Before = { before_?: string }
export type After = { after_?: string }

export type GreaterThan = { ge_?: number }
export type LessThan = { le_?: number }

export type OperationRequest = 'and_' | 'or_'
export type OperatorRequest = { operator?: OperationRequest }

export type TagFilterRequest = OperatorRequest & All & IsNull

export type StateFilterRequest = OperatorRequest & { type?: Any } & { name?: Any }

export type FlowFilterRequest = {
  operator?: OperationRequest,
  id?: Any,
  name?: Any & Like,
  tags?: TagFilterRequest,
}

export type FlowRunFilterRequest = {
  operator?: OperationRequest,
  id?: Any & NotAny,
  name?: Any & Like,
  tags?: TagFilterRequest,
  deployment_id?: OperatorRequest & Any & IsNull,
  work_queue_name?: OperatorRequest & Any & IsNull,
  state?: StateFilterRequest,
  flow_version?: Any,
  start_time?: Before & After & IsNull,
  expected_start_time?: Before & After,
  next_scheduled_start_time?: Before & After,
  parent_task_run_id?: OperatorRequest & Any & IsNull,
  parent_flow_run_id?: Any,
}

export type TaskRunFilterRequest = {
  operator?: OperationRequest,
  id?: Any,
  name?: Any & Like,
  tags?: TagFilterRequest,
  state?: StateFilterRequest,
  start_time?: Before & After & IsNull,
  subflow_runs?: Exists,
}

export type DeploymentFilterRequest = {
  operator?: OperationRequest,
  id?: Any,
  name?: Any & Like,
  is_schedule_active?: Equals,
  work_queue_name?: Any,
}

export type WorkPoolFilterRequest = {
  operator?: OperationRequest,
  id?: Any,
  name?: Any,
  type?: Any,
}

export type WorkPoolQueueFilterRequest = {
  operator?: OperationRequest,
  id?: Any,
  name?: Any,
}

export type UnionFilterRequest<T> = {
  flows?: FlowFilterRequest,
  flow_runs?: FlowRunFilterRequest,
  task_runs?: TaskRunFilterRequest,
  deployments?: DeploymentFilterRequest,
  work_pools?: WorkPoolFilterRequest,
  work_pool_queues?: WorkPoolQueueFilterRequest,
  sort?: T,
  offset?: number,
  limit?: number,
}

export type BlockTypeFilterRequest = {
  name?: Like,
  slug?: Any,
}

export type BlockSchemaFilterRequest = {
  operator?: OperationRequest,
  block_type_id?: Any,
  block_capabilities?: All,
  id?: Any,
  version?: Any,
}

export type BlockDocumentFilterRequest = {
  operator?: OperationRequest,
  id?: Any,
  is_anonymous?: NullableEquals,
  block_type_id?: Any,
  name?: Any & Like,
}

export type FlowsFilterRequest = UnionFilterRequest<FlowSortValues>
export type FlowRunsFilterRequest = UnionFilterRequest<FlowRunSortValues>
export type TaskRunsFilterRequest = UnionFilterRequest<TaskRunSortValues>
export type DeploymentsFilterRequest = UnionFilterRequest<DeploymentSortValues>

export type ArtifactFilterRequest = {
  id?: Any,
  key?: Any & Like & Exists,
  type?: Any & NotAny,
  flow_run_id?: Any,
  task_run_id?: Any,
}

export type ArtifactsFilterRequest = {
  artifacts?: ArtifactFilterRequest,
  task_runs?: TaskRunFilterRequest,
  flow_runs?: FlowRunFilterRequest,
  sort?: ArtifactSortValues,
  offset?: number,
  limit?: number,
}

export type VariableFilterRequest = {
  id?: Any,
  name?: Any & Like,
  value?: Any & Like,
}

export type VariablesFilterRequest = {
  variables?: VariableFilterRequest,
  sort?: VariableSortValues,
  offset?: number,
  limit?: number,
}

export type FlowRunsHistoryFilterRequest = FlowRunsFilterRequest & {
  history_start: string,
  history_end: string,
  history_interval_seconds: number,
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
    operator?: OperationRequest,
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
  block_types?: BlockTypeFilterRequest,
  block_schemas?: BlockSchemaFilterRequest,
  offset?: number,
  limit?: number,
}

export type BlockSchemasFilterRequest = {
  block_schemas?: BlockSchemaFilterRequest,
  offset?: number,
  limit?: number,
}

export type BlockDocumentsFilterRequest = {
  block_documents?: BlockDocumentFilterRequest,
  block_types?: BlockTypeFilterRequest,
  block_schemas?: BlockSchemaFilterRequest,
  include_secrets?: boolean,
  offset?: number,
  limit?: number,
}

export type WorkQueuesFilterRequest = {
  work_queues?: {
    operator?: OperationRequest,
    id?: Any,
    name?: Any & StartsWith,
  },
  offset?: number,
  limit?: number,
}

export type WorkPoolsFilterRequest = {
  work_pools?: WorkPoolFilterRequest,
  offset?: number,
  limit?: number,
}

export type WorkPoolQueuesFilterRequest = {
  work_pools?: WorkPoolFilterRequest,
  offset?: number,
  limit?: number,
}

export type WorkPoolWorkersFilterRequest = {
  workers?: {
    operator?: OperationRequest,
    last_heartbeat_time?: Before & After,
  },
  limit?: number,
  offset?: number,
}

export type TaskRunsHistoryFilterRequest = Pick<TaskRunsFilterRequest, 'deployments' | 'flow_runs' | 'task_runs' | 'flows'> & {
  history_start: string,
  history_end: string,
  history_interval_seconds: number,
}