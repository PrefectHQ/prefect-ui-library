import { BooleanRouteParam, DateRouteParam, NumberRouteParam, RouteQueryParamsSchema, StringRouteParam, useRouteQueryParams } from '@prefecthq/vue-compositions'
import { Ref, reactive, ComputedRef, toRef, computed } from 'vue'
import { DeploymentSortValuesSortParam } from '@/formatters/DeploymentSortValuesSortParam'
import { FlowRunSortValuesSortParam } from '@/formatters/FlowRunSortValuesSortParam'
import { FlowSortValuesSortParam } from '@/formatters/FlowSortValuesSortParam'
import { OperatorRouteParam } from '@/formatters/OperatorRouteParam'
import { TaskRunSortValuesSortParam } from '@/formatters/TaskRunSortValuesSortParam'
import { BlockDocumentFilter, BlockSchemaFilter, BlockTypeFilter, DeploymentFilter, DeploymentsFilter, FlowFilter, FlowRunFilter, FlowRunsFilter, FlowRunsHistoryFilter, FlowsFilter, StateFilter, TagFilter, TaskRunFilter, TaskRunsFilter, UnionFilter, UnionFilterSort, WorkPoolFilter, WorkPoolQueueFilter, WorkPoolsFilter } from '@/models/Filters'
import { AnyRecord } from '@/types/any'
import { MaybeReactive } from '@/types/reactivity'
import { merge } from '@/utilities/object'
import { dateFunctions } from '@/utilities/timezone'

export type Filter<T extends AnyRecord> = {
  [P in keyof Required<T>]: [T[P]] extends [AnyRecord | undefined]
    ? Filter<Exclude<T[P], undefined>>
    : T[P]
}

export type Extras<T extends AnyRecord> = {
  clear: () => void,
  set: (filters: T) => void,
  exist: ComputedRef<boolean>,
}

export type UseFilter<T extends AnyRecord> = {
  filter: Filter<T>,
} & Extras<T>

function withExtras<T extends AnyRecord>(filter: Filter<T>): UseFilter<T> {
  const defaultValue: T = JSON.parse(JSON.stringify(filter))

  const clear = (): void => {
    Object.assign(filter, defaultValue)
  }

  const set = (newFilters: T): void => {
    merge(filter as T, newFilters)
  }

  const exist = computed(() => JSON.stringify(filter) === JSON.stringify(defaultValue))

  return {
    filter,
    clear,
    set,
    exist,
  }
}

export function useTagFilter(defaultValue: MaybeReactive<TagFilter> = {}): UseFilter<TagFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const filter: Filter<TagFilter> = reactive({
    operator: toRef(defaultValueReactive, 'operator'),
    name: toRef(defaultValueReactive, 'name'),
    isNull: toRef(defaultValueReactive, 'isNull'),
  })

  return withExtras(filter)
}

const tagFilterSchema: RouteQueryParamsSchema<TagFilter> = {
  operator: OperatorRouteParam,
  name: StringRouteParam,
  isNull: BooleanRouteParam,
}

export function useTagFilterFromRoute(defaultValue: MaybeReactive<TagFilter> = {}, prefix?: string): UseFilter<TagFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const params = useRouteQueryParams(tagFilterSchema, defaultValueReactive, prefix)
  const filter: Filter<TagFilter> = reactive(params)

  return withExtras(filter)
}

export function useStateFilter(defaultValue: MaybeReactive<StateFilter> = {}): UseFilter<StateFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const filter: Filter<StateFilter> = reactive({
    operator: toRef(defaultValueReactive, 'operator'),
    name: toRef(defaultValueReactive, 'name'),
    type: toRef(defaultValueReactive, 'type'),
  })

  return withExtras(filter)
}

const stateFilterSchema: RouteQueryParamsSchema<StateFilter> = {
  operator: OperatorRouteParam,
  type: StringRouteParam,
  name: StringRouteParam,
}

export function useStateFilterFromRoute(defaultValue: MaybeReactive<StateFilter> = {}, prefix?: string): UseFilter<StateFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const params = useRouteQueryParams(stateFilterSchema, defaultValueReactive, prefix)
  const filter: Filter<StateFilter> = reactive(params)

  return withExtras(filter)
}

export function useFlowFilter(defaultValue: MaybeReactive<FlowFilter> = {}): UseFilter<FlowFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const tags = useTagFilter(defaultValueReactive.tags)
  const filter: Filter<FlowFilter> = reactive({
    operator: toRef(defaultValueReactive, 'operator'),
    id: toRef(defaultValueReactive, 'id'),
    name: toRef(defaultValueReactive, 'name'),
    nameLike: toRef(defaultValueReactive, 'nameLike'),
    tags: tags.filter,
  })

  return withExtras(filter)
}

const flowFilterSchema: RouteQueryParamsSchema<FlowFilter> = {
  operator: OperatorRouteParam,
  id: StringRouteParam,
  name: StringRouteParam,
  nameLike: StringRouteParam,
  tags: tagFilterSchema,
}

export function useFlowFilterFromRoute(defaultValue: MaybeReactive<FlowFilter> = {}, prefix?: string): UseFilter<FlowFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const params = useRouteQueryParams(flowFilterSchema, defaultValueReactive, prefix)
  const filter: Filter<FlowFilter> = reactive(params)

  return withExtras(filter)
}

export function useFlowRunFilter(defaultValue: MaybeReactive<FlowRunFilter> = {}): UseFilter<FlowRunFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const state = useStateFilter(defaultValueReactive.state)
  const tags = useTagFilter(defaultValueReactive.tags)
  const filter: Filter<FlowRunFilter> = reactive({
    deploymentId: toRef(defaultValueReactive, 'deploymentId'),
    deploymentIdNull: toRef(defaultValueReactive, 'deploymentIdNull'),
    deploymentIdOperator: toRef(defaultValueReactive, 'deploymentIdOperator'),
    expectedStartTimeAfter: toRef(defaultValueReactive, 'expectedStartTimeAfter'),
    expectedStartTimeBefore: toRef(defaultValueReactive, 'expectedStartTimeBefore'),
    flowVersion: toRef(defaultValueReactive, 'flowVersion'),
    id: toRef(defaultValueReactive, 'id'),
    name: toRef(defaultValueReactive, 'name'),
    nameLike: toRef(defaultValueReactive, 'nameLike'),
    nextExpectedStartTimeAfter: toRef(defaultValueReactive, 'nextExpectedStartTimeAfter'),
    nextExpectedStartTimeBefore: toRef(defaultValueReactive, 'nextExpectedStartTimeBefore'),
    notId: toRef(defaultValueReactive, 'notId'),
    operator: toRef(defaultValueReactive, 'operator'),
    parentTaskRunId: toRef(defaultValueReactive, 'parentTaskRunId'),
    parentTaskRunIdNull: toRef(defaultValueReactive, 'parentTaskRunIdNull'),
    parentTaskRunIdOperator: toRef(defaultValueReactive, 'parentTaskRunIdOperator'),
    startTimeAfter: toRef(defaultValueReactive, 'startTimeAfter'),
    startTimeBefore: toRef(defaultValueReactive, 'startTimeBefore'),
    startTimeNull: toRef(defaultValueReactive, 'startTimeNull'),
    state: state.filter,
    tags: tags.filter,
    workQueueName: toRef(defaultValueReactive, 'workQueueName'),
    workQueueNameIsNull: toRef(defaultValueReactive, 'workQueueNameIsNull'),
    workQueueNameOperator: toRef(defaultValueReactive, 'workQueueNameOperator'),
  })

  return withExtras(filter)
}

const flowRunFilterSchema: RouteQueryParamsSchema<FlowRunFilter> = {
  operator: OperatorRouteParam,
  id: StringRouteParam,
  notId: StringRouteParam,
  name: StringRouteParam,
  nameLike: StringRouteParam,
  tags: tagFilterSchema,
  deploymentIdOperator: OperatorRouteParam,
  deploymentId: StringRouteParam,
  deploymentIdNull: BooleanRouteParam,
  workQueueNameOperator: OperatorRouteParam,
  workQueueName: StringRouteParam,
  workQueueNameIsNull: BooleanRouteParam,
  state: stateFilterSchema,
  flowVersion: StringRouteParam,
  expectedStartTimeBefore: DateRouteParam,
  expectedStartTimeAfter: DateRouteParam,
  nextExpectedStartTimeBefore: DateRouteParam,
  nextExpectedStartTimeAfter: DateRouteParam,
  startTimeBefore: DateRouteParam,
  startTimeAfter: DateRouteParam,
  startTimeNull: BooleanRouteParam,
  parentTaskRunIdOperator: OperatorRouteParam,
  parentTaskRunId: StringRouteParam,
  parentTaskRunIdNull: BooleanRouteParam,
}

export function useFlowRunFilterFromRoute(defaultValue: MaybeReactive<FlowRunFilter> = {}, prefix?: string): UseFilter<FlowRunFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const params = useRouteQueryParams(flowRunFilterSchema, defaultValueReactive, prefix)
  const filter: Filter<FlowRunFilter> = reactive(params)

  return withExtras(filter)
}

export function useTaskRunFilter(defaultValue: MaybeReactive<TaskRunFilter> = {}): UseFilter<TaskRunFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const tags = useTagFilter(defaultValueReactive.tags)
  const state = useStateFilter(defaultValueReactive.state)
  const filter: Filter<TaskRunFilter> = reactive({
    id: toRef(defaultValueReactive, 'id'),
    name: toRef(defaultValueReactive, 'name'),
    nameLike: toRef(defaultValueReactive, 'nameLike'),
    operator: toRef(defaultValueReactive, 'operator'),
    startTimeAfter: toRef(defaultValueReactive, 'startTimeAfter'),
    startTimeBefore: toRef(defaultValueReactive, 'startTimeBefore'),
    startTimeNull: toRef(defaultValueReactive, 'startTimeNull'),
    state: state.filter,
    subFlowRunsExist: toRef(defaultValueReactive, 'subFlowRunsExist'),
    tags: tags.filter,
  })

  return withExtras(filter)
}

const taskRunFilterSchema: RouteQueryParamsSchema<TaskRunFilter> = {
  operator: OperatorRouteParam,
  id: StringRouteParam,
  name: StringRouteParam,
  nameLike: StringRouteParam,
  tags: tagFilterSchema,
  state: stateFilterSchema,
  startTimeBefore: DateRouteParam,
  startTimeAfter: DateRouteParam,
  startTimeNull: BooleanRouteParam,
  subFlowRunsExist: BooleanRouteParam,
}

export function useTaskRunFilterFromRoute(defaultValue: MaybeReactive<TaskRunFilter> = {}, prefix?: string): UseFilter<TaskRunFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const params = useRouteQueryParams(taskRunFilterSchema, defaultValueReactive, prefix)
  const filter: Filter<TaskRunFilter> = reactive(params)

  return withExtras(filter)
}

export function useDeploymentFilter(defaultValue: MaybeReactive<DeploymentFilter> = {}): UseFilter<DeploymentFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const tags = useTagFilter(defaultValueReactive.tags)
  const filter: Filter<DeploymentFilter> = reactive({
    operator: toRef(defaultValueReactive, 'operator'),
    id: toRef(defaultValueReactive, 'id'),
    name: toRef(defaultValueReactive, 'name'),
    nameLike: toRef(defaultValueReactive, 'nameLike'),
    isScheduleActive: toRef(defaultValueReactive, 'isScheduleActive'),
    workQueueName: toRef(defaultValueReactive, 'workQueueName'),
    tags: tags.filter,
  })

  return withExtras(filter)
}

const deploymentFilterSchema: RouteQueryParamsSchema<DeploymentFilter> = {
  operator: OperatorRouteParam,
  id: StringRouteParam,
  name: StringRouteParam,
  nameLike: StringRouteParam,
  isScheduleActive: BooleanRouteParam,
  workQueueName: StringRouteParam,
  tags: tagFilterSchema,
}

export function useDeploymentFilterFromRoute(defaultValue: MaybeReactive<DeploymentFilter> = {}, prefix?: string): UseFilter<DeploymentFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const params = useRouteQueryParams(deploymentFilterSchema, defaultValueReactive, prefix)
  const filter: Filter<DeploymentFilter> = reactive(params)

  return withExtras(filter)
}

export function useWorkPoolFilter(defaultValue: MaybeReactive<WorkPoolFilter> = {}): UseFilter<WorkPoolFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const filter: Filter<WorkPoolFilter> = reactive({
    operator: toRef(defaultValueReactive, 'operator'),
    id: toRef(defaultValueReactive, 'id'),
    name: toRef(defaultValueReactive, 'name'),
    type: toRef(defaultValueReactive, 'type'),
  })

  return withExtras(filter)
}

const workPoolFilterSchema: RouteQueryParamsSchema<WorkPoolFilter> = {
  operator: OperatorRouteParam,
  id: StringRouteParam,
  name: StringRouteParam,
  type: StringRouteParam,
}

export function useWorkPoolFilterFromRoute(defaultValue: MaybeReactive<WorkPoolFilter> = {}, prefix?: string): UseFilter<WorkPoolFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const params = useRouteQueryParams(workPoolFilterSchema, defaultValueReactive, prefix)
  const filter: Filter<WorkPoolFilter> = reactive(params)

  return withExtras(filter)
}

export function useWorkPoolQueueFilter(defaultValue: MaybeReactive<WorkPoolQueueFilter> = {}): UseFilter<WorkPoolQueueFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const filter: Filter<WorkPoolQueueFilter> = reactive({
    operator: toRef(defaultValueReactive, 'operator'),
    id: toRef(defaultValueReactive, 'id'),
    name: toRef(defaultValueReactive, 'name'),
  })

  return withExtras(filter)
}

const workPoolQueueFilterSchema: RouteQueryParamsSchema<WorkPoolQueueFilter> = {
  operator: OperatorRouteParam,
  id: StringRouteParam,
  name: StringRouteParam,
}

export function useWorkPoolQueueFilterFromRoute(defaultValue: MaybeReactive<WorkPoolQueueFilter> = {}, prefix?: string): UseFilter<WorkPoolQueueFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const params = useRouteQueryParams(workPoolQueueFilterSchema, defaultValueReactive, prefix)
  const filter: Filter<WorkPoolQueueFilter> = reactive(params)

  return withExtras(filter)
}

export function useBlockTypeFilter(defaultValue: MaybeReactive<BlockTypeFilter> = {}): UseFilter<BlockTypeFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const filter: Filter<BlockTypeFilter> = reactive({
    nameLike: toRef(defaultValueReactive, 'nameLike'),
    slug: toRef(defaultValueReactive, 'slug'),
  })

  return withExtras(filter)
}

const blockTypeFilterSchema: RouteQueryParamsSchema<BlockTypeFilter> = {
  nameLike: StringRouteParam,
  slug: StringRouteParam,
}

export function useBlockTypeFilterFromRoute(defaultValue: MaybeReactive<BlockTypeFilter> = {}, prefix?: string): UseFilter<BlockTypeFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const params = useRouteQueryParams(blockTypeFilterSchema, defaultValueReactive, prefix)
  const filter: Filter<BlockTypeFilter> = reactive(params)

  return withExtras(filter)
}

export function useBlockSchemaFilter(defaultValue: MaybeReactive<BlockSchemaFilter> = {}): UseFilter<BlockSchemaFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const filter: Filter<BlockSchemaFilter> = reactive({
    operator: toRef(defaultValueReactive, 'operator'),
    id: toRef(defaultValueReactive, 'id'),
    blockTypeId: toRef(defaultValueReactive, 'blockTypeId'),
    blockCapabilities: toRef(defaultValueReactive, 'blockCapabilities'),
    version: toRef(defaultValueReactive, 'version'),
  })

  return withExtras(filter)
}

const blockSchemaFilterSchema: RouteQueryParamsSchema<BlockSchemaFilter> = {
  operator: OperatorRouteParam,
  id: StringRouteParam,
  blockTypeId: StringRouteParam,
  blockCapabilities: StringRouteParam,
  version: StringRouteParam,
}

export function useBlockSchemaFilterFromRoute(defaultValue: MaybeReactive<BlockSchemaFilter> = {}, prefix?: string): UseFilter<BlockSchemaFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const params = useRouteQueryParams(blockSchemaFilterSchema, defaultValueReactive, prefix)
  const filter: Filter<BlockSchemaFilter> = reactive(params)

  return withExtras(filter)
}

export function useBlockDocumentFilter(defaultValue: MaybeReactive<BlockDocumentFilter> = {}): UseFilter<BlockDocumentFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const filter: Filter<BlockDocumentFilter> = reactive({
    operator: toRef(defaultValueReactive, 'operator'),
    id: toRef(defaultValueReactive, 'id'),
    isAnonymous: toRef(defaultValueReactive, 'isAnonymous'),
    blockTypeId: toRef(defaultValueReactive, 'blockTypeId'),
    name: toRef(defaultValueReactive, 'name'),
  })

  return withExtras(filter)
}

const blockDocumentFilterSchema: RouteQueryParamsSchema<BlockDocumentFilter> = {
  operator: OperatorRouteParam,
  id: StringRouteParam,
  isAnonymous: BooleanRouteParam,
  blockTypeId: StringRouteParam,
  name: StringRouteParam,
}

export function useBlockDocumentFilterFromRoute(defaultValue: MaybeReactive<BlockDocumentFilter> = {}, prefix?: string): UseFilter<BlockDocumentFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const params = useRouteQueryParams(blockDocumentFilterSchema, defaultValueReactive, prefix)
  const filter: Filter<BlockDocumentFilter> = reactive(params)

  return withExtras(filter)
}

export function useWorkPoolsFilter(defaultValue: MaybeReactive<WorkPoolsFilter> = {}): UseFilter<WorkPoolsFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const workPools = useWorkPoolFilter(defaultValueReactive.workPools)
  const filter: Filter<WorkPoolsFilter> = reactive({
    offset: toRef(defaultValueReactive, 'offset'),
    limit: toRef(defaultValueReactive, 'limit'),
    workPools: workPools.filter,
  })

  return withExtras(filter)
}

const workPoolsFilterSchema: RouteQueryParamsSchema<WorkPoolsFilter> = {
  workPools: workPoolFilterSchema,
  offset: NumberRouteParam,
  limit: NumberRouteParam,
}

export function useWorkPoolsFilterFromRoute(defaultValue: MaybeReactive<WorkPoolsFilter> = {}, prefix?: string): UseFilter<WorkPoolsFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const params = useRouteQueryParams(workPoolsFilterSchema, defaultValueReactive, prefix)
  const filter: Filter<WorkPoolsFilter> = reactive(params)

  return withExtras(filter)
}

export function useUnionFilter<T extends UnionFilter>(defaultValue: MaybeReactive<T>): UseFilter<T> {
  const defaultValueReactive = reactive(defaultValue) as T
  const flows = useFlowFilter(defaultValueReactive.flows)
  const flowRuns = useFlowRunFilter(defaultValueReactive.flowRuns)
  const taskRuns = useTaskRunFilter(defaultValueReactive.taskRuns)
  const deployments = useDeploymentFilter(defaultValueReactive.deployments)
  const workPools = useWorkPoolFilter(defaultValueReactive.workPools)
  const workPoolQueues = useWorkPoolQueueFilter(defaultValueReactive.workPoolQueues)
  const filter = reactive({
    flows: flows.filter,
    flowRuns: flowRuns.filter,
    taskRuns: taskRuns.filter,
    deployments: deployments.filter,
    workPools: workPools.filter,
    workPoolQueues: workPoolQueues.filter,
    sort: toRef(defaultValueReactive, 'sort') as Ref<T['sort']>,
    offset: toRef(defaultValueReactive, 'offset'),
    limit: toRef(defaultValueReactive, 'limit'),
  }) as Filter<T>

  return withExtras(filter)
}

export const useFlowsFilter = (defaultValue: MaybeReactive<FlowsFilter> = {}): UseFilter<FlowsFilter> => useUnionFilter<FlowsFilter>(defaultValue)
export const useFlowRunsFilter = (defaultValue: MaybeReactive<FlowRunsFilter> = {}): UseFilter<FlowRunsFilter> => useUnionFilter<FlowRunsFilter>(defaultValue)
export const useTaskRunsFilter = (defaultValue: MaybeReactive<TaskRunsFilter> = {}): UseFilter<TaskRunsFilter> => useUnionFilter<TaskRunsFilter>(defaultValue)
export const useDeploymentsFilter = (defaultValue: MaybeReactive<DeploymentsFilter> = {}): UseFilter<DeploymentsFilter> => useUnionFilter<DeploymentsFilter>(defaultValue)

const unionFilterSchema: Omit<RouteQueryParamsSchema<UnionFilter>, 'sort'> = {
  flows: flowFilterSchema,
  flowRuns: flowRunFilterSchema,
  taskRuns: taskRunFilterSchema,
  deployments: deploymentFilterSchema,
  workPools: workPoolFilterSchema,
  workPoolQueues: workPoolQueueFilterSchema,
  offset: NumberRouteParam,
  limit: NumberRouteParam,
}

export function useUnionFilterFromRoute<T extends UnionFilterSort>(sort: RouteQueryParamsSchema<UnionFilter<T>>['sort'], defaultValue: MaybeReactive<UnionFilter<T>>, prefix?: string): UseFilter<UnionFilter<T>> {
  const schema: RouteQueryParamsSchema<UnionFilter<T>> = {
    ...unionFilterSchema,
    sort,
  }
  const defaultValueReactive = reactive(defaultValue) as UnionFilter<T>
  const params = useRouteQueryParams(schema, defaultValueReactive, prefix)
  const filter = reactive(params) as Filter<UnionFilter<T>>

  return withExtras(filter)
}

export function useFlowsFilterFromRoute(defaultValue: MaybeReactive<FlowsFilter> = {}, prefix?: string): UseFilter<FlowsFilter> {
  return useUnionFilterFromRoute(FlowSortValuesSortParam, defaultValue, prefix)
}

export function useFlowRunsFilterFromRoute(defaultValue: MaybeReactive<FlowRunsFilter> = {}, prefix?: string): UseFilter<FlowRunsFilter> {
  return useUnionFilterFromRoute(FlowRunSortValuesSortParam, defaultValue, prefix)
}

export function useTaskRunsFilterFromRoute(defaultValue: MaybeReactive<TaskRunsFilter> = {}, prefix?: string): UseFilter<TaskRunsFilter> {
  return useUnionFilterFromRoute(TaskRunSortValuesSortParam, defaultValue, prefix)
}

export function useDeploymentsFilterFromRoute(defaultValue: MaybeReactive<DeploymentsFilter> = {}, prefix?: string): UseFilter<DeploymentsFilter> {
  return useUnionFilterFromRoute(DeploymentSortValuesSortParam, defaultValue, prefix)
}

export function useRecentFlowRunsFilter(defaultValue: MaybeReactive<FlowRunsFilter>): UseFilter<FlowRunsFilter> {
  const { filter, ...extras } = useFlowRunsFilter(defaultValue)

  filter.flowRuns.expectedStartTimeAfter = dateFunctions.subDays(dateFunctions.startOfToday(), 7)
  filter.flowRuns.expectedStartTimeBefore = dateFunctions.addDays(dateFunctions.endOfToday(), 1)

  return {
    filter,
    ...extras,
  }
}

export function useFlowRunsHistoryFilter(defaultValue: MaybeReactive<FlowRunsHistoryFilter>): UseFilter<FlowRunsHistoryFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const { filter: flowRunsFilter } = useFlowRunsFilter(defaultValueReactive)

  const filter: Filter<FlowRunsHistoryFilter> = reactive({
    ...flowRunsFilter,
    historyEnd: toRef(defaultValueReactive, 'historyEnd'),
    historyStart: toRef(defaultValueReactive, 'historyStart'),
    historyIntervalSeconds: toRef(defaultValueReactive, 'historyIntervalSeconds'),
  })

  return withExtras(filter)
}

const flowRunsHistoryFilterSchema: RouteQueryParamsSchema<FlowRunsHistoryFilter> = {
  ...unionFilterSchema,
  historyEnd: DateRouteParam,
  historyStart: DateRouteParam,
  historyIntervalSeconds: NumberRouteParam,
  sort: FlowRunSortValuesSortParam,
}

export function useFlowRunsHistoryFilterFromRoute(defaultValue: MaybeReactive<FlowRunsHistoryFilter>, prefix?: string): UseFilter<FlowRunsHistoryFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const params = useRouteQueryParams(flowRunsHistoryFilterSchema, defaultValueReactive, prefix)
  const filter: Filter<FlowRunsHistoryFilter> = reactive(params)

  return withExtras(filter)
}
