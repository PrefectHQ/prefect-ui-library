/* eslint-disable camelcase */
import { asArray } from '@prefecthq/prefect-design'
import { Any, Like, All, IsNull, OperatorRequest, TagFilterRequest, FlowFilterRequest, FlowRunFilterRequest, NotAny, StateFilterRequest, Before, After, TaskRunFilterRequest, Exists, DeploymentFilterRequest, Equals, FlowsFilterRequest, FlowRunsFilterRequest, TaskRunsFilterRequest, DeploymentsFilterRequest, BlockTypeFilterRequest, BlockSchemaFilterRequest, BlockDocumentFilterRequest, NotificationsFilterRequest, SavedSearchesFilterRequest, LogsFilterRequest, GreaterThan, LessThan, ConcurrencyLimitsFilterRequest, BlockTypesFilterRequest, BlockSchemasFilterRequest, BlockDocumentsFilterRequest, WorkQueuesFilterRequest, StartsWith, WorkPoolFilterRequest, WorkPoolsFilterRequest, WorkPoolQueueFilterRequest } from '@/models/api/Filters'
import { FlowFilter, FlowRunFilter, Operation, StateFilter, TagFilter, TaskRunFilter, DeploymentFilter, FlowsFilter, FlowRunsFilter, TaskRunsFilter, DeploymentsFilter, BlockTypeFilter, BlockSchemaFilter, BlockDocumentFilter, NotificationsFilter, SavedSearchesFilter, LogsFilter, ConcurrencyLimitsFilter, BlockTypesFilter, BlockSchemasFilter, BlockDocumentsFilter, WorkQueuesFilter, WorkPoolFilter, WorkPoolsFilter, WorkPoolQueueFilter } from '@/models/Filters'
import { MapFunction } from '@/services'

function toOperator(value?: Operation): OperatorRequest | undefined {
  if (typeof value === 'undefined') {
    return value
  }

  return { operator: `${value}_` }
}

function toAny(value?: string | string[]): Any | undefined {
  if (typeof value === 'undefined') {
    return value
  }

  return { any_: asArray(value) }
}

function toNotAny(value?: string | string[]): NotAny | undefined {
  if (typeof value === 'undefined') {
    return value
  }

  return { not_any_: asArray(value) }
}

function toAll(value?: string | string[]): All | undefined {
  if (typeof value === 'undefined') {
    return value
  }

  return { all_: asArray(value) }
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
  return {
    ...toOperator(source.operator),
    type: toAny(source.type),
    name: toAny(source.name),
  }
}

export const mapFlowFilter: MapFunction<FlowFilter, FlowFilterRequest> = function(source) {
  return {
    ...toOperator(source.operator),
    id: toAny(source.id),
    name: {
      ...toAny(source.name),
      ...toLike(source.nameLike),
    },
    tags: this.map('TagFilter', source.tags, 'TagFilterRequest'),
  }
}

export const mapFlowRunFilter: MapFunction<FlowRunFilter, FlowRunFilterRequest> = function(source) {
  return {
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
      ...toBefore(source.startTimeBefore),
      ...toAfter(source.startTimeAfter),
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
  }
}

export const mapTaskRunFilter: MapFunction<TaskRunFilter, TaskRunFilterRequest> = function(source) {
  return {
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
  }
}

export const mapDeploymentFilter: MapFunction<DeploymentFilter, DeploymentFilterRequest> = function(source) {
  return {
    ...toOperator(source.operator),
    name: {
      ...toAny(source.name),
      ...toLike(source.nameLike),
    },
    is_schedule_active: toEquals(source.isScheduleActive),
    work_queue_name: toAny(source.workQueueName),
  }
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

export const mapFlowsFilter: MapFunction<FlowsFilter, FlowsFilterRequest> = function(source) {
  return {
    flows: this.map('FlowFilter', source.flows, 'FlowFilterRequest'),
    flow_runs: this.map('FlowRunFilter', source.flowRuns, 'FlowRunFilterRequest'),
    task_runs: this.map('TaskRunFilter', source.taskRuns, 'TaskRunFilterRequest'),
    deployments: this.map('DeploymentFilter', source.deployments, 'DeploymentFilterRequest'),
    work_pools: this.map('WorkPoolFilter', source.workPools, 'WorkPoolFilterRequest'),
    work_pool_queues: this.map('WorkPoolQueueFilter', source.workPoolQueues, 'WorkPoolQueueFilterRequest'),
    sort: source.sort,
    limit: source.limit,
    offset: source.offset,
  }
}

export const mapFlowRunsFilter: MapFunction<FlowRunsFilter, FlowRunsFilterRequest> = function(source) {
  return {
    flows: this.map('FlowFilter', source.flows, 'FlowFilterRequest'),
    flow_runs: this.map('FlowRunFilter', source.flowRuns, 'FlowRunFilterRequest'),
    task_runs: this.map('TaskRunFilter', source.taskRuns, 'TaskRunFilterRequest'),
    deployments: this.map('DeploymentFilter', source.deployments, 'DeploymentFilterRequest'),
    work_pools: this.map('WorkPoolFilter', source.workPools, 'WorkPoolFilterRequest'),
    work_pool_queues: this.map('WorkPoolQueueFilter', source.workPoolQueues, 'WorkPoolQueueFilterRequest'),
    sort: source.sort,
    limit: source.limit,
    offset: source.offset,
  }
}

export const mapTaskRunsFilter: MapFunction<TaskRunsFilter, TaskRunsFilterRequest> = function(source) {
  return {
    flows: this.map('FlowFilter', source.flows, 'FlowFilterRequest'),
    flow_runs: this.map('FlowRunFilter', source.flowRuns, 'FlowRunFilterRequest'),
    task_runs: this.map('TaskRunFilter', source.taskRuns, 'TaskRunFilterRequest'),
    deployments: this.map('DeploymentFilter', source.deployments, 'DeploymentFilterRequest'),
    work_pools: this.map('WorkPoolFilter', source.workPools, 'WorkPoolFilterRequest'),
    work_pool_queues: this.map('WorkPoolQueueFilter', source.workPoolQueues, 'WorkPoolQueueFilterRequest'),
    sort: source.sort,
    limit: source.limit,
    offset: source.offset,
  }
}

export const mapDeploymentsFilter: MapFunction<DeploymentsFilter, DeploymentsFilterRequest> = function(source) {
  return {
    flows: this.map('FlowFilter', source.flows, 'FlowFilterRequest'),
    flow_runs: this.map('FlowRunFilter', source.flowRuns, 'FlowRunFilterRequest'),
    task_runs: this.map('TaskRunFilter', source.taskRuns, 'TaskRunFilterRequest'),
    deployments: this.map('DeploymentFilter', source.deployments, 'DeploymentFilterRequest'),
    work_pools: this.map('WorkPoolFilter', source.workPools, 'WorkPoolFilterRequest'),
    work_pool_queues: this.map('WorkPoolQueueFilter', source.workPoolQueues, 'WorkPoolQueueFilterRequest'),
    sort: source.sort,
    limit: source.limit,
    offset: source.offset,
  }
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
    block_capabilities: toAll(source.blockCapability),
    id: toAny(source.id),
    version: toAny(source.version),
  }
}

export const mapBlockDocumentFilter: MapFunction<BlockDocumentFilter, BlockDocumentFilterRequest> = function(source) {
  return {
    ...toOperator(source.operator),
    id: toAny(source.id),
    is_anonymous: toEquals(source.isAnonymous),
    block_type_id: toAny(source.blockTypeId),
    name: toAny(source.name),
  }
}

export const mapNotificationsFilter: MapFunction<NotificationsFilter, NotificationsFilterRequest> = function(source) {
  return {
    flow_run_notification_policy_filter: {
      is_active: toEquals(source.notification?.isActive),
    },
    offset: source.offset,
    limit: source.limit,
  }
}

export const mapSavedSearchesFilter: MapFunction<SavedSearchesFilter, SavedSearchesFilterRequest> = function(source) {
  return {
    offset: source.offset,
    limit: source.limit,
  }
}

export const mapLogsFilter: MapFunction<LogsFilter, LogsFilterRequest> = function(source) {
  return {
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
  }
}

export const mapConcurrencyLimitsFilter: MapFunction<ConcurrencyLimitsFilter, ConcurrencyLimitsFilterRequest> = function(source) {
  return {
    offset: source.offset,
    limit: source.limit,
  }
}

// maps already exist for BlockTypeFilter and BlockSchemaFilter
export const mapBlockTypesFilter: MapFunction<BlockTypesFilter, BlockTypesFilterRequest> = function(source) {
  return {
    block_types: this.map('BlockTypeFilter', source.blockTypes, 'BlockTypeFilterRequest'),
    block_schemas: this.map('BlockSchemaFilter', source.blockSchemas, 'BlockSchemaFilterRequest'),
    offset: source.offset,
    limit: source.limit,
  }
}

// maps already exist for BlockSchemaFilter
export const mapBlockSchemasFilter: MapFunction<BlockSchemasFilter, BlockSchemasFilterRequest> = function(source) {
  return {
    block_schemas: this.map('BlockSchemaFilter', source.blockSchemas, 'BlockSchemaFilterRequest'),
    offset: source.offset,
    limit: source.limit,
  }
}

// maps already exist for BlockTypeFilter and BlockSchemaFilter and BlockDocumentFilter
export const mapBlockDocumentsFilter: MapFunction<BlockDocumentsFilter, BlockDocumentsFilterRequest> = function(source) {
  return {
    block_documents: this.map('BlockDocumentFilter', source.blockDocuments, 'BlockDocumentFilterRequest'),
    block_schemas: this.map('BlockSchemaFilter', source.blockSchemas, 'BlockSchemaFilterRequest'),
    block_types: this.map('BlockTypeFilter', source.blockTypes, 'BlockTypeFilterRequest'),
    include_secrets: source.includeSecrets,
    offset: source.offset,
    limit: source.limit,
  }
}

export const mapWorkQueuesFilter: MapFunction<WorkQueuesFilter, WorkQueuesFilterRequest> = function(source) {
  return {
    work_queues: {
      ...toOperator(source.workQueues?.operator),
      name: {
        ...toAny(source.workQueues?.name),
        ...toStartsWith(source.workQueues?.nameStartsWith),
      },
    },
    offset: source.offset,
    limit: source.limit,
  }
}

export const mapWorkPoolsFilter: MapFunction<WorkPoolsFilter, WorkPoolsFilterRequest> = function(source) {
  return {
    work_pools: this.map('WorkPoolFilter', source.workPools, 'WorkPoolFilterRequest'),
    offset: source.offset,
    limit: source.limit,
  }
}