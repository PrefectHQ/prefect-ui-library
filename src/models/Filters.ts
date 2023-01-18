import { FlowSortValues, FlowRunSortValues, TaskRunSortValues, DeploymentSortValues, LogSortValues } from '@/types'

export type Operation = 'and' | 'or'

export function isOperation(value: string): value is Operation {
  return ['and', 'or'].includes(value)
}

export type TagFilter = {
  operator?: Operation,
  name?: string | string[],
  isNull?: boolean,
}

export type StateFilter = {
  operator?: Operation,
  type?: string | string[],
  name?: string | string[],
}

export type FlowFilter = {
  operator?: Operation,
  id?: string | string[],
  name?: string | string[],
  nameLike?: string,
  tags?: TagFilter,
}

export type FlowRunFilter = {
  operator?: Operation,
  id?: string | string[],
  notId?: string | string[],
  name?: string | string[],
  nameLike?: string,
  tags?: TagFilter,
  deploymentIdOperator?: Operation,
  deploymentId?: string | string[],
  deploymentIdNull?: boolean,
  workQueueNameOperator?: Operation,
  workQueueName?: string | string[],
  workQueueNameIsNull?: boolean,
  state?: StateFilter,
  flowVersion?: string | string[],
  expectedStartTimeBefore?: Date,
  expectedStartTimeAfter?: Date,
  nextExpectedStartTimeBefore?: Date,
  nextExpectedStartTimeAfter?: Date,
  startTimeBefore?: Date,
  startTimeAfter?: Date,
  startTimeNull?: boolean,
  parentTaskRunIdOperator?: Operation,
  parentTaskRunId?: string | string[],
  parentTaskRunIdNull?: boolean,
}

export type TaskRunFilter = {
  operator?: Operation,
  id?: string | string[],
  name?: string | string[],
  nameLike?: string,
  tags?: TagFilter,
  state?: StateFilter,
  startTimeBefore?: Date,
  startTimeAfter?: Date,
  startTimeNull?: boolean,
  subFlowRunsExist?: boolean,
}

export type DeploymentFilter = {
  operator?: Operation,
  id?: string | string[],
  name?: string | string[],
  nameLike?: string,
  isScheduleActive?: boolean,
  workQueueName?: string | string[],
}

export type WorkPoolFilter = {
  operator?: Operation,
  id?: string | string[],
  name?: string | string[],
  type?: string | string[],
}

export type UnionFilterSort = FlowSortValues | FlowRunSortValues | TaskRunSortValues | DeploymentSortValues
export type UnionFilter<T extends UnionFilterSort = UnionFilterSort> = {
  flows?: FlowFilter,
  flowRuns?: FlowRunFilter,
  taskRuns?: TaskRunFilter,
  deployments?: DeploymentFilter,
  sort?: T,
  offset?: number,
  limit?: number,
}

export type BlockTypeFilter = {
  nameLike?: string,
  slug?: string | string[],
}

export type BlockSchemaFilter = {
  operator?: Operation,
  id?: string | string[],
  blockTypeId?: string | string[],
  blockCapability?: string | string[],
  version?: string | string[],
}

export type BlockDocumentFilter = {
  operator?: Operation,
  id?: string | string[],
  isAnonymous?: boolean,
  blockTypeId?: string | string[],
  name?: string | string[],
}

export type FlowsFilter = UnionFilter<FlowSortValues>
export type FlowRunsFilter = UnionFilter<FlowRunSortValues>
export type TaskRunsFilter = UnionFilter<TaskRunSortValues>
export type DeploymentsFilter = UnionFilter<DeploymentSortValues>

export type NotificationsFilter = {
  notification?: {
    isActive?: boolean,
  },
  offset?: number,
  limit?: number,
}

export type SavedSearchesFilter = {
  offset?: number,
  limit?: number,
}

export type LogsFilter = {
  logs?: {
    operator?: Operation,
    levelGreaterThan?: number,
    levelLessThan?: number,
    timestampBefore?: Date,
    timestampAfter?: Date,
    flowRunId?: string | string[],
    taskRunId?: string | string[],
  },
  sort?: LogSortValues,
  offset?: number,
  limit?: number,
}

export type ConcurrencyLimitsFilter = {
  offset?: number,
  limit?: number,
}

export type BlockTypesFilter = {
  blockTypes?: BlockTypeFilter,
  blockSchemas?: BlockSchemaFilter,
  offset?: number,
  limit?: number,
}

export type BlockSchemasFilter = {
  blockSchemas?: BlockSchemaFilter,
  offset?: number,
  limit?: number,
}

export type BlockDocumentsFilter = {
  blockDocuments?: BlockDocumentFilter,
  blockTypes?: BlockTypeFilter,
  blockSchemas?: BlockSchemaFilter,
  includeSecrets?: boolean,
  offset?: number,
  limit?: number,
}

export type WorkQueuesFilter = {
  workQueues?: {
    operator?: Operation,
    name?: string | string[],
    nameStartsWith: string | string[],
  },
  offset?: number,
  limit?: number,
}

export type WorkPoolsFilter = {
  workPools?: WorkPoolFilter,
  offset?: number,
  limit?: number,
}