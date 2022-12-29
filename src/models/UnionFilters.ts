import { RunSort } from '@/models/api/UnionFilters'
import { DeploymentSortValues, FlowRunSortValues, FlowSortValues, TaskRunSortValues } from '@/types/SortOptionTypes'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace FilterOperation {
  export type All = { all?: string[] }
  export type Any = { any?: string[] }
  export type Like = { like?: string }
  export type NotAny = { notAny?: string[] }
  export type Equal = { equal?: boolean }
  export type Exists = { exists?: boolean }
  export type IsNull = { isNull?: boolean }
  export type Before = { before?: string }
  export type After = { after?: string }
  export type Operator = 'and_' | 'or_'
}

export type Filter = {
  id?: FilterOperation.Any,
  name?: FilterOperation.Any & FilterOperation.Like,
  tags?: FilterOperation.All & FilterOperation.IsNull,
  operator?: FilterOperation.Operator,
}

export interface DeploymentFilter extends Filter {
  isScheduleActive?: FilterOperation.Equal,
}

export type FlowFilter = Filter

export type StateFilter = {
  type?: FilterOperation.Any,
  name?: FilterOperation.Any,
  operator?: FilterOperation.Operator,
}

export type TimeFrameFilter = FilterOperation.Before & FilterOperation.After

export interface FlowRunFilter extends Filter {
  id?: FilterOperation.Any & FilterOperation.NotAny,
  deploymentId?: FilterOperation.Any & FilterOperation.IsNull,
  state?: StateFilter,
  flowVersion?: FilterOperation.Any,
  workQueueName?: FilterOperation.Any,
  startTime?: TimeFrameFilter,
  expectedStartTime?: TimeFrameFilter,
  nextScheduledStartTime?: TimeFrameFilter,
  parentTaskRunId?: FilterOperation.Any & FilterOperation.IsNull,
  taskRuns?: TaskRunFilter,
}

export interface TaskRunFilter extends Filter {
  id?: FilterOperation.Any & FilterOperation.NotAny,
  state?: StateFilter,
  startTime?: TimeFrameFilter,
  subflowRuns?: FilterOperation.Exists,
}

export type DeploymentsFilter = { deployments?: DeploymentFilter }
export type FlowsFilter = { flows?: FlowFilter }
export type TaskRunsFilter = { taskRuns?: TaskRunFilter }
export type FlowRunsFilter = { flowRuns?: FlowRunFilter }

export type UnionFilters =
  & FlowsFilter
  & DeploymentsFilter
  & FlowRunsFilter
  & TaskRunsFilter
  & RunSort<FlowSortValues | DeploymentSortValues | FlowRunSortValues | TaskRunSortValues>

interface Historical {
  historyStart: Date,
  historyEnd: Date,
  historyIntervalSeconds: number,
}

export type FlowRunsHistoryFilter = UnionFilters & Historical