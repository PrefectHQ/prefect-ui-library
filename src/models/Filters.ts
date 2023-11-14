import { ArtifactSortValues, FlowSortValues, FlowRunSortValues, TaskRunSortValues, DeploymentSortValues, LogSortValues, VariableSortValues, BlockDocumentSortValues } from '@/types'

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
  parentFlowRunId?: string[],
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

export type ArtifactFilter = {
  id?: string[],
  key?: string[],
  keyLike?: string,
  keyExists?: boolean,
  type?: string[],
  notType?: string[],
  flowRunId?: string[],
  taskRunId?: string[],
}

export type ArtifactsFilter = {
  artifacts?: ArtifactFilter,
  flowRuns?: FlowRunFilter,
  taskRuns?: TaskRunFilter,
  sort?: ArtifactSortValues,
  limit?: number,
  offset?: number,
}

export type VariableFilter = {
  id?: string[],
  name?: string[],
  nameLike?: string,
  value?: string[],
  valueLike?: string,
  tags?: TagFilter,
}

export type VariablesFilter = {
  variables?: VariableFilter,
  sort?: VariableSortValues,
  limit?: number,
  offset?: number,
}

export type DeploymentFilter = {
  id?: string[],
  isScheduleActive?: boolean,
  name?: string[],
  nameLike?: string,
  operator?: Operation,
  tags?: TagFilter,
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
  isAnonymous?: boolean | null,
  blockTypeId?: string[],
  name?: string[],
  nameLike?: string,
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
  sort?: BlockDocumentSortValues,
  offset?: number,
  limit?: number,
}

export type WorkQueuesFilter = {
  workQueues?: {
    operator?: Operation,
    id?: string[],
    name?: string[],
    nameStartsWith?: string[],
  },
  offset?: number,
  limit?: number,
}

export type WorkPoolsFilter = {
  workPools?: WorkPoolFilter,
  offset?: number,
  limit?: number,
}

export type WorkPoolQueuesFilter = {
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

export type TaskRunsHistoryFilter = Pick<TaskRunsFilter, 'deployments' | 'flows' | 'flowRuns' | 'taskRuns'> & {
  historyStart: Date,
  historyEnd: Date,
  historyIntervalSeconds: number,
}