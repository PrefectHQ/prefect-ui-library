/* eslint-disable camelcase */
import { asArray } from '@prefecthq/prefect-design'
import { Any, Like, All, IsNull, OperatorRequest, TagFilterRequest, FlowFilterRequest, FlowRunFilterRequest, NotAny, StateFilterRequest, Before, After, TaskRunFilterRequest, Exists, DeploymentFilterRequest, Equals, FlowsFilterRequest, FlowRunsFilterRequest, TaskRunsFilterRequest, DeploymentsFilterRequest, BlockTypeFilterRequest, BlockSchemaFilterRequest, BlockDocumentFilterRequest, NotificationsFilterRequest, SavedSearchesFilterRequest, LogsFilterRequest, GreaterThan, LessThan, ConcurrencyLimitsFilterRequest, BlockTypesFilterRequest, BlockSchemasFilterRequest, BlockDocumentsFilterRequest, WorkQueuesFilterRequest, StartsWith, WorkPoolFilterRequest, WorkPoolsFilterRequest, WorkPoolQueueFilterRequest, FlowRunsHistoryFilterRequest, WorkPoolWorkersFilterRequest, WorkPoolQueuesFilterRequest, ArtifactsFilterRequest, ArtifactFilterRequest, NullableEquals, VariablesFilterRequest, VariableFilterRequest, TaskRunsHistoryFilterRequest } from '@/models/api/Filters'
import { FlowFilter, FlowRunFilter, Operation, StateFilter, TagFilter, TaskRunFilter, DeploymentFilter, FlowsFilter, FlowRunsFilter, TaskRunsFilter, DeploymentsFilter, BlockTypeFilter, BlockSchemaFilter, BlockDocumentFilter, NotificationsFilter, SavedSearchesFilter, LogsFilter, ConcurrencyLimitsFilter, BlockTypesFilter, BlockSchemasFilter, BlockDocumentsFilter, WorkQueuesFilter, WorkPoolFilter, WorkPoolsFilter, WorkPoolQueueFilter, FlowRunsHistoryFilter, WorkPoolWorkersFilter, WorkPoolQueuesFilter, ArtifactsFilter, ArtifactFilter, VariablesFilter, VariableFilter, TaskRunsHistoryFilter } from '@/models/Filters'
import { MapFunction } from '@/services'
import { removeEmptyObjects } from '@/utilities'

function toOperator(value?: Operation): OperatorRequest | undefined {
  if (typeof value === 'undefined') {
    return value
  }

  return { operator: `${value}_` }
}

function toAny(value?: string[]): Any | undefined {
  if (typeof value === 'undefined') {
    return value
  }

  if (value.length === 0) {
    return undefined
  }

  return { any_: value }
}

function toNotAny(value?: string[]): NotAny | undefined {
  if (typeof value === 'undefined') {
    return value
  }

  if (value.length === 0) {
    return undefined
  }

  return { not_any_: value }
}

function toAll(value?: string[]): All | undefined {
  if (typeof value === 'undefined') {
    return value
  }

  if (value.length === 0) {
    return undefined
  }

  return { all_: value }
}

function toIsNull(value?: boolean): IsNull | undefined {
  if (typeof value === 'undefined') {
    return value
  }

  return { is_null_: value }
}

function toLike(value?: string): Like | undefined {
  if (typeof value === 'undefined') {
    return value
  }

  return { like_: value }
}

function toBefore(value?: Date): Before | undefined {
  if (typeof value === 'undefined') {
    return value
  }

  return { before_: value.toISOString() }
}

function toAfter(value?: Date): After | undefined {
  if (typeof value === 'undefined') {
    return value
  }

  return { after_: value.toISOString() }
}

function toExists(value?: boolean): Exists | undefined {
  if (typeof value === 'undefined') {
    return value
  }

  return { exists_: value }
}

function toEquals(value?: boolean): Equals | undefined {
  if (typeof value === 'undefined') {
    return value
  }

  return { eq_: value }
}

function toNullableEquals(value?: boolean | null): NullableEquals | undefined {
  if (typeof value === 'undefined') {
    return value
  }

  return { eq_: value }
}

function toGreaterThan(value?: number): GreaterThan | undefined {
  if (typeof value === 'undefined') {
    return value
  }

  return { ge_: value }
}

function toLessThan(value?: number): LessThan | undefined {
  if (typeof value === 'undefined') {
    return value
  }

  return { le_: value }
}

function toStartsWith(value?: string | string[]): StartsWith | undefined {
  if (typeof value === 'undefined') {
    return value
  }

  return { startswith_: asArray(value) }
}

export const mapTagFilter: MapFunction<TagFilter, TagFilterRequest> = function(source) {
  return {
    ...toOperator(source.operator),
    ...toAll(source.name),
    ...toIsNull(source.isNull),
  }
}

export const mapStateFilter: MapFunction<StateFilter, StateFilterRequest> = function(source) {
  return removeEmptyObjects({
    ...toOperator(source.operator),
    type: toAny(source.type?.map(type => type.toUpperCase())),
    name: toAny(source.name),
  })
}

export const mapFlowFilter: MapFunction<FlowFilter, FlowFilterRequest> = function(source) {
  return removeEmptyObjects({
    ...toOperator(source.operator),
    id: toAny(source.id),
    name: {
      ...toAny(source.name),
      ...toLike(source.nameLike),
    },
    tags: this.map('TagFilter', source.tags, 'TagFilterRequest'),
  })
}

export const mapFlowRunFilter: MapFunction<FlowRunFilter, FlowRunFilterRequest> = function(source) {
  return removeEmptyObjects({
    ...toOperator(source.operator),
    id: {
      ...toAny(source.id),
      ...toNotAny(source.notId),
    },
    name: {
      ...toAny(source.name),
      ...toLike(source.nameLike),
    },
    tags: this.map('TagFilter', source.tags, 'TagFilterRequest'),
    deployment_id: {
      ...toOperator(source.deploymentIdOperator),
      ...toAny(source.deploymentId),
      ...toIsNull(source.deploymentIdNull),
    },
    work_queue_name: {
      ...toOperator(source.workQueueNameOperator),
      ...toAny(source.workQueueName),
      ...toIsNull(source.workQueueNameIsNull),
    },
    state: this.map('StateFilter', source.state, 'StateFilterRequest'),
    flow_version: toAny(source.flowVersion),
    start_time: {
      ...toBefore(source.startTimeBefore),
      ...toAfter(source.startTimeAfter),
      ...toIsNull(source.startTimeNull),
    },
    expected_start_time: {
      ...toBefore(source.expectedStartTimeBefore),
      ...toAfter(source.expectedStartTimeAfter),
    },
    next_scheduled_start_time: {
      ...toBefore(source.nextExpectedStartTimeBefore),
      ...toAfter(source.nextExpectedStartTimeAfter),
    },
    parent_task_run_id: {
      ...toOperator(source.parentTaskRunIdOperator),
      ...toAny(source.parentTaskRunId),
      ...toIsNull(source.parentTaskRunIdNull),
    },
  })
}

export const mapTaskRunFilter: MapFunction<TaskRunFilter, TaskRunFilterRequest> = function(source) {
  return removeEmptyObjects({
    ...toOperator(source.operator),
    id: toAny(source.id),
    name: {
      ...toAny(source.name),
      ...toLike(source.nameLike),
    },
    tags: this.map('TagFilter', source.tags, 'TagFilterRequest'),
    state: this.map('StateFilter', source.state, 'StateFilterRequest'),
    start_time: {
      ...toBefore(source.startTimeBefore),
      ...toAfter(source.startTimeAfter),
      ...toIsNull(source.startTimeNull),
    },
    subflow_runs: toExists(source.subFlowRunsExist),
  })
}

export const mapDeploymentFilter: MapFunction<DeploymentFilter, DeploymentFilterRequest> = function(source) {
  return removeEmptyObjects({
    ...toOperator(source.operator),
    tags: this.map('TagFilter', source.tags, 'TagFilterRequest'),
    id: toAny(source.id),
    name: {
      ...toAny(source.name),
      ...toLike(source.nameLike),
    },
    is_schedule_active: toEquals(source.isScheduleActive),
    work_queue_name: toAny(source.workQueueName),
  })
}

export const mapWorkPoolFilter: MapFunction<WorkPoolFilter, WorkPoolFilterRequest> = function(source) {
  return {
    ...toOperator(source.operator),
    id: toAny(source.id),
    name: toAny(source.name),
    type: toAny(source.type),
  }
}

export const mapWorkPoolQueueFilter: MapFunction<WorkPoolQueueFilter, WorkPoolQueueFilterRequest> = function(source) {
  return {
    ...toOperator(source.operator),
    id: toAny(source.id),
    name: toAny(source.name),
  }
}

export const mapArtifactFilter: MapFunction<ArtifactFilter, ArtifactFilterRequest> = function(source) {
  return {
    id: toAny(source.id),
    key: {
      ...toExists(source.keyExists),
      ...toAny(source.key),
      ...toLike(source.keyLike),
    },
    type: {
      ...toAny(source.type),
      ...toNotAny(source.notType),
    },
    flow_run_id: toAny(source.flowRunId),
    task_run_id: toAny(source.taskRunId),
  }
}

export const mapArtifactsFilter: MapFunction<ArtifactsFilter, ArtifactsFilterRequest> = function(source) {
  return {
    artifacts: this.map('ArtifactFilter', source.artifacts, 'ArtifactFilterRequest'),
    flow_runs: this.map('FlowRunFilter', source.flowRuns, 'FlowRunFilterRequest'),
    task_runs: this.map('TaskRunFilter', source.taskRuns, 'TaskRunFilterRequest'),
    sort: source.sort,
    limit: source.limit,
    offset: source.offset,
  }
}

export const mapVariableFilter: MapFunction<VariableFilter, VariableFilterRequest> = function(source) {
  return {
    id: toAny(source.id),
    name: {
      ...toAny(source.name),
      ...toLike(source.nameLike),
    },
    value: {
      ...toAny(source.value),
      ...toLike(source.valueLike),
    },
    tags: this.map('TagFilter', source.tags, 'TagFilterRequest'),
  }
}

export const mapVariablesFilter: MapFunction<VariablesFilter, VariablesFilterRequest> = function(source) {
  return {
    variables: this.map('VariableFilter', source.variables, 'VariableFilterRequest'),
    sort: source.sort,
    limit: source.limit,
    offset: source.offset,
  }
}

export const mapFlowsFilter: MapFunction<FlowsFilter, FlowsFilterRequest> = function(source) {
  return removeEmptyObjects({
    flows: this.map('FlowFilter', source.flows, 'FlowFilterRequest'),
    flow_runs: this.map('FlowRunFilter', source.flowRuns, 'FlowRunFilterRequest'),
    task_runs: this.map('TaskRunFilter', source.taskRuns, 'TaskRunFilterRequest'),
    deployments: this.map('DeploymentFilter', source.deployments, 'DeploymentFilterRequest'),
    work_pools: this.map('WorkPoolFilter', source.workPools, 'WorkPoolFilterRequest'),
    work_pool_queues: this.map('WorkPoolQueueFilter', source.workPoolQueues, 'WorkPoolQueueFilterRequest'),
    sort: source.sort,
    limit: source.limit,
    offset: source.offset,
  })
}

export const mapFlowRunsFilter: MapFunction<FlowRunsFilter, FlowRunsFilterRequest> = function(source) {
  return removeEmptyObjects({
    flows: this.map('FlowFilter', source.flows, 'FlowFilterRequest'),
    flow_runs: this.map('FlowRunFilter', source.flowRuns, 'FlowRunFilterRequest'),
    task_runs: this.map('TaskRunFilter', source.taskRuns, 'TaskRunFilterRequest'),
    deployments: this.map('DeploymentFilter', source.deployments, 'DeploymentFilterRequest'),
    work_pools: this.map('WorkPoolFilter', source.workPools, 'WorkPoolFilterRequest'),
    work_pool_queues: this.map('WorkPoolQueueFilter', source.workPoolQueues, 'WorkPoolQueueFilterRequest'),
    sort: source.sort,
    limit: source.limit,
    offset: source.offset,
  })
}

export const mapFlowRunsHistoryFilter: MapFunction<FlowRunsHistoryFilter, FlowRunsHistoryFilterRequest> = function(source) {
  const { historyStart, historyEnd, historyIntervalSeconds, ...filter } = source

  return removeEmptyObjects({
    ...this.map('FlowRunsFilter', filter, 'FlowRunsFilterRequest'),
    history_start: this.map('Date', historyStart, 'string'),
    history_end: this.map('Date', historyEnd, 'string'),
    history_interval_seconds: historyIntervalSeconds,
  })
}

export const mapTaskRunsFilter: MapFunction<TaskRunsFilter, TaskRunsFilterRequest> = function(source) {
  return removeEmptyObjects({
    flows: this.map('FlowFilter', source.flows, 'FlowFilterRequest'),
    flow_runs: this.map('FlowRunFilter', source.flowRuns, 'FlowRunFilterRequest'),
    task_runs: this.map('TaskRunFilter', source.taskRuns, 'TaskRunFilterRequest'),
    deployments: this.map('DeploymentFilter', source.deployments, 'DeploymentFilterRequest'),
    work_pools: this.map('WorkPoolFilter', source.workPools, 'WorkPoolFilterRequest'),
    work_pool_queues: this.map('WorkPoolQueueFilter', source.workPoolQueues, 'WorkPoolQueueFilterRequest'),
    sort: source.sort,
    limit: source.limit,
    offset: source.offset,
  })
}

export const mapDeploymentsFilter: MapFunction<DeploymentsFilter, DeploymentsFilterRequest> = function(source) {
  return removeEmptyObjects({
    flows: this.map('FlowFilter', source.flows, 'FlowFilterRequest'),
    flow_runs: this.map('FlowRunFilter', source.flowRuns, 'FlowRunFilterRequest'),
    task_runs: this.map('TaskRunFilter', source.taskRuns, 'TaskRunFilterRequest'),
    deployments: this.map('DeploymentFilter', source.deployments, 'DeploymentFilterRequest'),
    work_pools: this.map('WorkPoolFilter', source.workPools, 'WorkPoolFilterRequest'),
    work_pool_queues: this.map('WorkPoolQueueFilter', source.workPoolQueues, 'WorkPoolQueueFilterRequest'),
    sort: source.sort,
    limit: source.limit,
    offset: source.offset,
  })
}

export const mapBlockTypeFilter: MapFunction<BlockTypeFilter, BlockTypeFilterRequest> = function(source) {
  return {
    name: toLike(source.nameLike),
    slug: toAny(source.slug),
  }
}

export const mapBlockSchemaFilter: MapFunction<BlockSchemaFilter, BlockSchemaFilterRequest> = function(source) {
  return {
    ...toOperator(source.operator),
    block_type_id: toAny(source.blockTypeId),
    block_capabilities: toAll(source.blockCapabilities),
    id: toAny(source.id),
    version: toAny(source.version),
  }
}

export const mapBlockDocumentFilter: MapFunction<BlockDocumentFilter, BlockDocumentFilterRequest> = function(source) {
  return {
    ...toOperator(source.operator),
    id: toAny(source.id),
    is_anonymous: toNullableEquals(source.isAnonymous),
    block_type_id: toAny(source.blockTypeId),
    name: toAny(source.name),
  }
}

export const mapNotificationsFilter: MapFunction<NotificationsFilter, NotificationsFilterRequest> = function(source) {
  return removeEmptyObjects({
    flow_run_notification_policy_filter: {
      is_active: toEquals(source.notification?.isActive),
    },
    offset: source.offset,
    limit: source.limit,
  })
}

export const mapSavedSearchesFilter: MapFunction<SavedSearchesFilter, SavedSearchesFilterRequest> = function(source) {
  return {
    offset: source.offset,
    limit: source.limit,
  }
}

export const mapLogsFilter: MapFunction<LogsFilter, LogsFilterRequest> = function(source) {
  return removeEmptyObjects({
    logs: {
      ...toOperator(source.logs?.operator),
      level: {
        ...toGreaterThan(source.logs?.levelGreaterThan),
        ...toLessThan(source.logs?.levelLessThan),
      },
      timestamp: {
        ...toBefore(source.logs?.timestampBefore),
        ...toAfter(source.logs?.timestampAfter),
      },
      flow_run_id: toAny(source.logs?.flowRunId),
      task_run_id: toAny(source.logs?.taskRunId),
    },
    sort: source.sort,
    offset: source.offset,
    limit: source.limit,
  })
}

export const mapConcurrencyLimitsFilter: MapFunction<ConcurrencyLimitsFilter, ConcurrencyLimitsFilterRequest> = function(source) {
  return {
    offset: source.offset,
    limit: source.limit,
  }
}

export const mapBlockTypesFilter: MapFunction<BlockTypesFilter, BlockTypesFilterRequest> = function(source) {
  return removeEmptyObjects({
    block_types: this.map('BlockTypeFilter', source.blockTypes, 'BlockTypeFilterRequest'),
    block_schemas: this.map('BlockSchemaFilter', source.blockSchemas, 'BlockSchemaFilterRequest'),
    offset: source.offset,
    limit: source.limit,
  })
}

export const mapBlockSchemasFilter: MapFunction<BlockSchemasFilter, BlockSchemasFilterRequest> = function(source) {
  return removeEmptyObjects({
    block_schemas: this.map('BlockSchemaFilter', source.blockSchemas, 'BlockSchemaFilterRequest'),
    offset: source.offset,
    limit: source.limit,
  })
}

export const mapBlockDocumentsFilter: MapFunction<BlockDocumentsFilter, BlockDocumentsFilterRequest> = function(source) {
  return removeEmptyObjects({
    block_documents: this.map('BlockDocumentFilter', source.blockDocuments, 'BlockDocumentFilterRequest'),
    block_schemas: this.map('BlockSchemaFilter', source.blockSchemas, 'BlockSchemaFilterRequest'),
    block_types: this.map('BlockTypeFilter', source.blockTypes, 'BlockTypeFilterRequest'),
    include_secrets: source.includeSecrets,
    offset: source.offset,
    limit: source.limit,
  })
}

export const mapWorkQueuesFilter: MapFunction<WorkQueuesFilter, WorkQueuesFilterRequest> = function(source) {
  return removeEmptyObjects({
    work_queues: {
      ...toOperator(source.workQueues?.operator),
      id: toAny(source.workQueues?.name),
      name: {
        ...toAny(source.workQueues?.name),
        ...toStartsWith(source.workQueues?.nameStartsWith),
      },
    },
    offset: source.offset,
    limit: source.limit,
  })
}

export const mapWorkPoolsFilter: MapFunction<WorkPoolsFilter, WorkPoolsFilterRequest> = function(source) {
  return removeEmptyObjects({
    work_pools: this.map('WorkPoolFilter', source.workPools, 'WorkPoolFilterRequest'),
    offset: source.offset,
    limit: source.limit,
  })
}

export const mapWorkPoolWorkersFilter: MapFunction<WorkPoolWorkersFilter, WorkPoolWorkersFilterRequest> = function(source) {
  return removeEmptyObjects({
    workers: {
      ...toOperator(source.workers?.operator),
      last_heartbeat_time: {
        ...toAfter(source.workers?.lastHeartbeatTimeAfter),
        ...toBefore(source.workers?.lastHeartbeatTimeBefore),
      },
    },
    limit: source.limit,
    offset: source.offset,
  })
}

export const mapWorkPoolQueuesFilter: MapFunction<WorkPoolQueuesFilter, WorkPoolQueuesFilterRequest> = function(source) {
  return removeEmptyObjects({
    work_pools: this.map('WorkPoolFilter', source.workPools, 'WorkPoolFilterRequest'),
    offset: source.offset,
    limit: source.limit,
  })
}

export const mapTaskRunsHistoryFilter: MapFunction<TaskRunsHistoryFilter, TaskRunsHistoryFilterRequest> = function(source) {
  return {
    history_start: this.map('Date', source.historyStart, 'string'),
    history_end: this.map('Date', source.historyEnd, 'string'),
    history_interval_seconds: source.historyIntervalSeconds,
    flows: this.map('FlowFilter', source.flows, 'FlowFilterRequest'),
    deployments: this.map('DeploymentFilter', source.deployments, 'DeploymentFilterRequest'),
    flow_runs: this.map('FlowRunFilter', source.flowRuns, 'FlowRunFilterRequest'),
    task_runs: this.map('TaskRunFilter', source.taskRuns, 'TaskRunFilterRequest'),
  }
}