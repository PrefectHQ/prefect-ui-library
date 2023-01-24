import { FlowSortValues, FlowRunSortValues, TaskRunSortValues, DeploymentSortValues, LogSortValues } from '@/types'

export type Operation = 'and' | 'or'

export function isOperation(value: string): value is Operation {
  return ['and', 'or'].includes(value)
}

export type TagFilter = {
  operator?: Operation,
  name?: string[],
  isNull?: boolean,
}

export type StateFilter = {
  operator?: Operation,
  type?: string[],
  name?: string[],
}

export type FlowFilter = {
  operator?: Operation,
  id?: string[],
  name?: string[],
  nameLike?: string,
  tags?: TagFilter,
}

export type FlowRunFilter = {
  operator?: Operation,
  id?: string[],
  notId?: string[],
  name?: string[],
  nameLike?: string,
  tags?: TagFilter,
  deploymentIdOperator?: Operation,
  deploymentId?: string[],
  deploymentIdNull?: boolean,
  workQueueNameOperator?: Operation,
  workQueueName?: string[],
  workQueueNameIsNull?: boolean,
  state?: StateFilter,
  flowVersion?: string[],
  expectedStartTimeBefore?: Date,
  expectedStartTimeAfter?: Date,
  nextExpectedStartTimeBefore?: Date,
  nextExpectedStartTimeAfter?: Date,
  startTimeBefore?: Date,
  startTimeAfter?: Date,
  startTimeNull?: boolean,
  parentTaskRunIdOperator?: Operation,
  parentTaskRunId?: string[],
  parentTaskRunIdNull?: boolean,
}

export type TaskRunFilter = {
  operator?: Operation,
  id?: string[],
  name?: string[],
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
  id?: string[],
  name?: string[],
  nameLike?: string,
  isScheduleActive?: boolean,
  workQueueName?: string[],
}

export type WorkPoolFilter = {
  operator?: Operation,
  id?: string[],
  name?: string[],
  type?: string[],
}

export type WorkPoolQueueFilter = {
  operator?: Operation,
  id?: string[],
  name?: string[],
}

export type UnionFilterSort = FlowSortValues | FlowRunSortValues | TaskRunSortValues | DeploymentSortValues
export type UnionFilter<T extends UnionFilterSort = UnionFilterSort> = {
  flows?: FlowFilter,
  flowRuns?: FlowRunFilter,
  taskRuns?: TaskRunFilter,
  deployments?: DeploymentFilter,
  workPools?: WorkPoolFilter,
  workPoolQueues?: WorkPoolQueueFilter,
  sort?: T,
  offset?: number,
  limit?: number,
}

export type BlockTypeFilter = {
  nameLike?: string,
  slug?: string[],
}

export type BlockSchemaFilter = {
  operator?: Operation,
  id?: string[],
  blockTypeId?: string[],
  blockCapabilities?: string[],
  version?: string[],
}

export type BlockDocumentFilter = {
  operator?: Operation,
  id?: string[],
  isAnonymous?: boolean,
  blockTypeId?: string[],
  name?: string[],
}

export type FlowsFilter = UnionFilter<FlowSortValues>
export type FlowRunsFilter = UnionFilter<FlowRunSortValues>
export type TaskRunsFilter = UnionFilter<TaskRunSortValues>
export type DeploymentsFilter = UnionFilter<DeploymentSortValues>

export type FlowRunsHistoryFilter = FlowRunsFilter & {
  historyStart: Date,
  historyEnd: Date,
  historyIntervalSeconds: number,
}

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
    flowRunId?: string[],
    taskRunId?: string[],
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
    name?: string[],
    nameStartsWith: string[],
  },
  offset?: number,
  limit?: number,
}

export type WorkPoolsFilter = {
  workPools?: WorkPoolFilter,
  offset?: number,
  limit?: number,
}

export type WorkPoolWorkersFilter = {
  workers?: {
    operator?: Operation,
    lastHeartbeatTimeBefore?: Date,
    lastHeartbeatTimeAfter?: Date,
  },
  limit?: number,
  offset?: number,
}