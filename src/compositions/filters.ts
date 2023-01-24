import { BooleanRouteParam, DateRouteParam, NumberRouteParam, RouteQueryParamsSchema, StringRouteParam, useRouteQueryParams } from '@prefecthq/vue-compositions'
import { Ref, reactive, ComputedRef, toRef, computed } from 'vue'
import { DeploymentSortValuesSortParam } from '@/formatters/DeploymentSortValuesSortParam'
import { FlowRunSortValuesSortParam } from '@/formatters/FlowRunSortValuesSortParam'
import { FlowSortValuesSortParam } from '@/formatters/FlowSortValuesSortParam'
import { OperatorRouteParam } from '@/formatters/OperatorRouteParam'
import { TaskRunSortValuesSortParam } from '@/formatters/TaskRunSortValuesSortParam'
import { BlockDocumentFilter, BlockSchemaFilter, BlockTypeFilter, DeploymentFilter, DeploymentsFilter, FlowFilter, FlowRunFilter, FlowRunsFilter, FlowRunsHistoryFilter, FlowsFilter, Operation, StateFilter, TagFilter, TaskRunFilter, TaskRunsFilter, UnionFilter, UnionFilterSort, WorkPoolFilter, WorkPoolQueueFilter, WorkPoolsFilter } from '@/models/Filters'
import { omit } from '@/utilities/object'
import { dateFunctions } from '@/utilities/timezone'

type BaseFilter<T extends Record<PropertyKey, unknown>> = {
  filter: T,
  hasFilters: ComputedRef<boolean>,
  clearFilters: () => void,
  setFilters: (filters: T) => void,
}

type FilterExtras<T extends Record<PropertyKey, unknown>> = Omit<BaseFilter<T>, 'filter'>

type UseFilter<T extends Record<PropertyKey, unknown>> = BaseFilter<T> & Required<{
  [Property in keyof T]: NonNullable<T[Property]> extends Record<PropertyKey, unknown>
    ? Omit<UseFilter<NonNullable<T[Property]>>, keyof BaseFilter<T>> | undefined
    : Ref<T[Property]>
}>

function useFilterExtras<T extends Record<PropertyKey, unknown>>(filter: T, defaultValue: T): FilterExtras<T> {

  // todo: DO NOT MERGE THIS AS IS.
  // update this to use new useIsSame composition from vue-compositions
  // https://github.com/prefecthq/vue-compositions/tree/main/src/useIsSame
  // @stackoverfloweth don't let me merge this
  const hasFilters = computed(() => true)

  const clearFilters = (): void => {
    setFilters(defaultValue)
  }

  const setFilters = (value: T): void => {
    Object.assign(filter, value)
  }

  return {
    hasFilters,
    clearFilters,
    setFilters,
  }
}

function omitExtras<T extends Record<PropertyKey, unknown>>(value: T): Omit<T, keyof FilterExtras<T>> {
  return omit(value, ['hasFilters', 'clearFilters', 'setFilters'])
}

export function useTagFilter(defaultValue: TagFilter = {}): UseFilter<TagFilter> {
  const operator = toRef(defaultValue, 'operator')
  const name = toRef(defaultValue, 'name')
  const isNull = toRef(defaultValue, 'isNull')
  const filter = reactive({
    operator,
    name,
    isNull,
  })

  return {
    operator,
    name,
    isNull,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
}

const tagFilterSchema: RouteQueryParamsSchema<TagFilter> = {
  operator: OperatorRouteParam,
  name: StringRouteParam,
  isNull: BooleanRouteParam,
}

export function useTagFilterFromRoute(defaultValue: TagFilter = {}, prefix?: string): UseFilter<TagFilter> {
  const params = useRouteQueryParams(tagFilterSchema, defaultValue, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
}

export function useStateFilter(defaultValue: StateFilter = {}): UseFilter<StateFilter> {
  const operator = toRef(defaultValue, 'operator')
  const name = toRef(defaultValue, 'name')
  const type = toRef(defaultValue, 'type')
  const filter = reactive({
    operator,
    name,
    type,
  })

  return {
    operator,
    name,
    type,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
}

const stateFilterSchema: RouteQueryParamsSchema<StateFilter> = {
  operator: OperatorRouteParam,
  type: StringRouteParam,
  name: StringRouteParam,
}

export function useStateFilterFromRoute(defaultValue: StateFilter = {}, prefix?: string): UseFilter<StateFilter> {
  const params = useRouteQueryParams(stateFilterSchema, defaultValue, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
}

export function useFlowFilter(defaultValue: FlowFilter = {}): UseFilter<FlowFilter> {
  const operator = toRef(defaultValue, 'operator')
  const id = toRef(defaultValue, 'id')
  const name = toRef(defaultValue, 'name')
  const nameLike = toRef(defaultValue, 'nameLike')
  const tags = useTagFilter()
  const filter = reactive({
    operator,
    id,
    name,
    nameLike,
    tags: tags.filter,
  })

  return {
    operator,
    id,
    name,
    nameLike,
    tags,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
}

const flowFilterSchema: RouteQueryParamsSchema<FlowFilter> = {
  operator: OperatorRouteParam,
  id: StringRouteParam,
  name: StringRouteParam,
  nameLike: StringRouteParam,
  tags: tagFilterSchema,
}

export function useFlowFilterFromRoute(defaultValue: FlowFilter = {}, prefix?: string): UseFilter<FlowFilter> {
  const params = useRouteQueryParams(flowFilterSchema, defaultValue, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
}

export function useFlowRunFilter(defaultValue: FlowRunFilter = {}): UseFilter<FlowRunFilter> {
  const operator = toRef(defaultValue, 'operator')
  const id = toRef(defaultValue, 'id')
  const notId = toRef(defaultValue, 'notId')
  const name = toRef(defaultValue, 'name')
  const nameLike = toRef(defaultValue, 'nameLike')
  const tags = useTagFilter()
  const deploymentIdOperator = toRef(defaultValue, 'deploymentIdOperator')
  const deploymentId = toRef(defaultValue, 'deploymentId')
  const deploymentIdNull = toRef(defaultValue, 'deploymentIdNull')
  const workQueueNameOperator = toRef(defaultValue, 'workQueueNameOperator')
  const workQueueName = toRef(defaultValue, 'workQueueName')
  const workQueueNameIsNull = toRef(defaultValue, 'workQueueNameIsNull')
  const state = useStateFilter()
  const flowVersion = toRef(defaultValue, 'flowVersion')
  const expectedStartTimeBefore = toRef(defaultValue, 'expectedStartTimeBefore')
  const expectedStartTimeAfter = toRef(defaultValue, 'expectedStartTimeAfter')
  const nextExpectedStartTimeBefore = toRef(defaultValue, 'nextExpectedStartTimeBefore')
  const nextExpectedStartTimeAfter = toRef(defaultValue, 'nextExpectedStartTimeAfter')
  const startTimeBefore = toRef(defaultValue, 'startTimeBefore')
  const startTimeAfter = toRef(defaultValue, 'startTimeAfter')
  const startTimeNull = toRef(defaultValue, 'startTimeNull')
  const parentTaskRunIdOperator = toRef(defaultValue, 'parentTaskRunIdOperator')
  const parentTaskRunId = toRef(defaultValue, 'parentTaskRunId')
  const parentTaskRunIdNull = toRef(defaultValue, 'parentTaskRunIdNull')
  const filter = reactive({
    operator,
    id,
    notId,
    name,
    nameLike,
    tags: tags.filter,
    deploymentIdOperator,
    deploymentId,
    deploymentIdNull,
    workQueueNameOperator,
    workQueueName,
    workQueueNameIsNull,
    state: state.filter,
    flowVersion,
    expectedStartTimeBefore,
    expectedStartTimeAfter,
    nextExpectedStartTimeBefore,
    nextExpectedStartTimeAfter,
    startTimeBefore,
    startTimeAfter,
    startTimeNull,
    parentTaskRunIdOperator,
    parentTaskRunId,
    parentTaskRunIdNull,
  })

  return {
    operator,
    id,
    notId,
    name,
    nameLike,
    tags,
    deploymentIdOperator,
    deploymentId,
    deploymentIdNull,
    workQueueNameOperator,
    workQueueName,
    workQueueNameIsNull,
    state,
    flowVersion,
    expectedStartTimeBefore,
    expectedStartTimeAfter,
    nextExpectedStartTimeBefore,
    nextExpectedStartTimeAfter,
    startTimeBefore,
    startTimeAfter,
    startTimeNull,
    parentTaskRunIdOperator,
    parentTaskRunId,
    parentTaskRunIdNull,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
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

export function useFlowRunFilterFromRoute(defaultValue: FlowRunFilter = {}, prefix?: string): UseFilter<FlowRunFilter> {
  const params = useRouteQueryParams(flowRunFilterSchema, defaultValue, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
}

export function useTaskRunFilter(defaultValue: TaskRunFilter = {}): UseFilter<TaskRunFilter> {
  const operator = toRef(defaultValue, 'operator')
  const id = toRef(defaultValue, 'id')
  const name = toRef(defaultValue, 'name')
  const nameLike = toRef(defaultValue, 'nameLike')
  const tags = useTagFilter(defaultValue.tags)
  const state = useStateFilter(defaultValue.state)
  const startTimeBefore = toRef(defaultValue, 'startTimeBefore')
  const startTimeAfter = toRef(defaultValue, 'startTimeAfter')
  const startTimeNull = toRef(defaultValue, 'startTimeNull')
  const subFlowRunsExist = toRef(defaultValue, 'subFlowRunsExist')
  const filter = reactive({
    operator,
    id,
    name,
    nameLike,
    tags: tags.filter,
    state: state.filter,
    startTimeBefore,
    startTimeAfter,
    startTimeNull,
    subFlowRunsExist,
  })

  return {
    operator,
    id,
    name,
    nameLike,
    tags,
    state,
    startTimeBefore,
    startTimeAfter,
    startTimeNull,
    subFlowRunsExist,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
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

export function useTaskRunFilterFromRoute(defaultValue: TaskRunFilter = {}, prefix?: string): UseFilter<TaskRunFilter> {
  const params = useRouteQueryParams(taskRunFilterSchema, defaultValue, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
}

export function useDeploymentFilter(defaultValue: DeploymentFilter = {}): UseFilter<DeploymentFilter> {
  const operator = toRef(defaultValue, 'operator')
  const id = toRef(defaultValue, 'id')
  const name = toRef(defaultValue, 'name')
  const nameLike = toRef(defaultValue, 'nameLike')
  const isScheduleActive = toRef(defaultValue, 'isScheduleActive')
  const workQueueName = toRef(defaultValue, 'workQueueName')
  const filter = reactive({
    operator,
    id,
    name,
    nameLike,
    isScheduleActive,
    workQueueName,
  })

  return {
    operator,
    id,
    name,
    nameLike,
    isScheduleActive,
    workQueueName,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
}

const deploymentFilterSchema: RouteQueryParamsSchema<DeploymentFilter> = {
  operator: OperatorRouteParam,
  id: StringRouteParam,
  name: StringRouteParam,
  nameLike: StringRouteParam,
  isScheduleActive: BooleanRouteParam,
  workQueueName: StringRouteParam,
}

export function useDeploymentFilterFromRoute(defaultValue: DeploymentFilter = {}, prefix?: string): UseFilter<DeploymentFilter> {
  const params = useRouteQueryParams(deploymentFilterSchema, defaultValue, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
}

export function useWorkPoolFilter(defaultValue: WorkPoolFilter = {}): UseFilter<WorkPoolFilter> {
  const operator = toRef(defaultValue, 'operator')
  const id = toRef(defaultValue, 'id')
  const name = toRef(defaultValue, 'name')
  const type = toRef(defaultValue, 'type')
  const filter = reactive({
    operator,
    id,
    name,
    type,
  })

  return {
    operator,
    id,
    name,
    type,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
}

const workPoolFilterSchema: RouteQueryParamsSchema<WorkPoolFilter> = {
  operator: OperatorRouteParam,
  id: StringRouteParam,
  name: StringRouteParam,
  type: StringRouteParam,
}

export function useWorkPoolFilterFromRoute(defaultValue: WorkPoolFilter = {}, prefix?: string): UseFilter<WorkPoolFilter> {
  const params = useRouteQueryParams(workPoolFilterSchema, defaultValue, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
}

export function useWorkPoolQueueFilter(defaultValue: WorkPoolQueueFilter = {}): UseFilter<WorkPoolQueueFilter> {
  const operator = toRef(defaultValue, 'operator')
  const id = toRef(defaultValue, 'id')
  const name = toRef(defaultValue, 'name')
  const filter = reactive({
    operator,
    id,
    name,
  })

  return {
    operator,
    id,
    name,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
}

const workPoolQueueFilterSchema: RouteQueryParamsSchema<WorkPoolQueueFilter> = {
  operator: OperatorRouteParam,
  id: StringRouteParam,
  name: StringRouteParam,
}

export function useWorkPoolQueueFilterFromRoute(defaultValue: WorkPoolQueueFilter = {}, prefix?: string): UseFilter<WorkPoolQueueFilter> {
  const params = useRouteQueryParams(workPoolQueueFilterSchema, defaultValue, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
}

export function useBlockTypeFilter(defaultValue: BlockTypeFilter = {}): UseFilter<BlockTypeFilter> {
  const nameLike = toRef(defaultValue, 'nameLike')
  const slug = toRef(defaultValue, 'slug')
  const filter = reactive({
    nameLike,
    slug,
  })

  return {
    nameLike,
    slug,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
}

const blockTypeFilterSchema: RouteQueryParamsSchema<BlockTypeFilter> = {
  nameLike: StringRouteParam,
  slug: StringRouteParam,
}

export function useBlockTypeFilterFromRoute(defaultValue: BlockTypeFilter = {}, prefix?: string): UseFilter<BlockTypeFilter> {
  const params = useRouteQueryParams(blockTypeFilterSchema, defaultValue, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
}

export function useBlockSchemaFilter(defaultValue: BlockSchemaFilter = {}): UseFilter<BlockSchemaFilter> {
  const operator = toRef(defaultValue, 'operator')
  const id = toRef(defaultValue, 'id')
  const blockTypeId = toRef(defaultValue, 'blockTypeId')
  const blockCapabilities = toRef(defaultValue, 'blockCapabilities')
  const version = toRef(defaultValue, 'version')
  const filter = reactive({
    operator,
    id,
    blockTypeId,
    blockCapabilities,
    version,
  })

  return {
    operator,
    id,
    blockTypeId,
    blockCapabilities,
    version,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
}

const blockSchemaFilterSchema: RouteQueryParamsSchema<BlockSchemaFilter> = {
  operator: OperatorRouteParam,
  id: StringRouteParam,
  blockTypeId: StringRouteParam,
  blockCapabilities: StringRouteParam,
  version: StringRouteParam,
}

export function useBlockSchemaFilterFromRoute(defaultValue: BlockSchemaFilter = {}, prefix?: string): UseFilter<BlockSchemaFilter> {
  const params = useRouteQueryParams(blockSchemaFilterSchema, defaultValue, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
}

export function useBlockDocumentFilter(defaultValue: BlockDocumentFilter = {}): UseFilter<BlockDocumentFilter> {
  const operator = toRef(defaultValue, 'operator')
  const id = toRef(defaultValue, 'id')
  const isAnonymous = toRef(defaultValue, 'isAnonymous')
  const blockTypeId = toRef(defaultValue, 'blockTypeId')
  const name = toRef(defaultValue, 'name')
  const filter = reactive({
    operator,
    id,
    isAnonymous,
    blockTypeId,
    name,
  })

  return {
    operator,
    id,
    isAnonymous,
    blockTypeId,
    name,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
}

const blockDocumentFilterSchema: RouteQueryParamsSchema<BlockDocumentFilter> = {
  operator: OperatorRouteParam,
  id: StringRouteParam,
  isAnonymous: BooleanRouteParam,
  blockTypeId: StringRouteParam,
  name: StringRouteParam,
}

export function useBlockDocumentFilterFromRoute(defaultValue: BlockDocumentFilter = {}, prefix?: string): UseFilter<BlockDocumentFilter> {
  const params = useRouteQueryParams(blockDocumentFilterSchema, defaultValue, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
}

export function useWorkPoolsFilter(defaultValue: WorkPoolsFilter = {}): UseFilter<WorkPoolsFilter> {
  const { filter: workPoolsFilter, ...workPools } = useWorkPoolFilter(defaultValue.workPools)
  const offset = toRef(defaultValue, 'offset')
  const limit = toRef(defaultValue, 'limit')
  const filter = reactive({
    workPools: workPoolsFilter,
    offset,
    limit,
  })

  return {
    workPools,
    offset,
    limit,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
}

const workPoolsFilterSchema: RouteQueryParamsSchema<WorkPoolsFilter> = {
  workPools: workPoolFilterSchema,
  offset: NumberRouteParam,
  limit: NumberRouteParam,
}

export function useWorkPoolsFilterFromRoute(defaultValue: WorkPoolsFilter = {}, prefix?: string): UseFilter<WorkPoolsFilter> {
  const params = useRouteQueryParams(workPoolsFilterSchema, defaultValue, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
}

export function useUnionFilter<T extends UnionFilter>(defaultValue: T): UseFilter<T> {
  const { filter: flowsFilter, ...flows } = useFlowFilter(defaultValue.flows)
  const { filter: flowRunsFilter, ...flowRuns } = useFlowRunFilter(defaultValue.flowRuns)
  const { filter: taskRunsFilter, ...taskRuns } = useTaskRunFilter(defaultValue.taskRuns)
  const { filter: deploymentsFilter, ...deployments } = useDeploymentFilter(defaultValue.deployments)
  const { filter: workPoolsFilter, ...workPools } = useWorkPoolFilter(defaultValue.workPools)
  const { filter: workPoolQueuesFilter, ...workPoolQueues } = useWorkPoolQueueFilter(defaultValue.workPoolQueues)
  const sort = toRef(defaultValue, 'sort') as Ref<T['sort']>
  const offset = toRef(defaultValue, 'offset')
  const limit = toRef(defaultValue, 'limit')
  const filter = reactive({
    flows: flowsFilter,
    flowRuns: flowRunsFilter,
    taskRuns: taskRunsFilter,
    deployments: deploymentsFilter,
    workPools: workPoolsFilter,
    workPoolQueues: workPoolQueuesFilter,
    sort,
    offset,
    limit,
  }) as T

  const extras = useFilterExtras(filter, defaultValue)

  return {
    flows: omitExtras(flows),
    flowRuns: omitExtras(flowRuns),
    taskRuns: omitExtras(taskRuns),
    deployments: omitExtras(deployments),
    workPools: omitExtras(workPools),
    workPoolQueues: omitExtras(workPoolQueues),
    sort,
    offset,
    limit,
    filter,
    ...extras,
  } as UseFilter<T>
}

export const useFlowsFilter = (defaultValue: FlowsFilter = {}): UseFilter<FlowsFilter> => useUnionFilter<FlowsFilter>(defaultValue)
export const useFlowRunsFilter = (defaultValue: FlowRunsFilter = {}): UseFilter<FlowRunsFilter> => useUnionFilter<FlowRunsFilter>(defaultValue)
export const useTaskRunsFilter = (defaultValue: TaskRunsFilter = {}): UseFilter<TaskRunsFilter> => useUnionFilter<TaskRunsFilter>(defaultValue)
export const useDeploymentsFilter = (defaultValue: DeploymentsFilter = {}): UseFilter<DeploymentsFilter> => useUnionFilter<DeploymentsFilter>(defaultValue)

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

export function useUnionFilterFromRoute<T extends UnionFilterSort>(sort: RouteQueryParamsSchema<UnionFilter<T>>['sort'], defaultValue: UnionFilter<T>, prefix?: string): UseFilter<UnionFilter<T>> {
  const schema: RouteQueryParamsSchema<UnionFilter<T>> = {
    ...unionFilterSchema,
    sort: sort,
  }
  const params = useRouteQueryParams(schema, defaultValue, prefix)
  const filter = reactive(params) as UnionFilter<T>
  const extras = useFilterExtras(filter, defaultValue)

  return {
    ...params,
    filter,
    ...extras,
  } as UseFilter<UnionFilter<T>>
}

export function useFlowsFilterFromRoute(defaultValue: FlowsFilter = {}, prefix?: string): UseFilter<FlowsFilter> {
  return useUnionFilterFromRoute(FlowSortValuesSortParam, defaultValue, prefix)
}

export function useFlowRunsFilterFromRoute(defaultValue: FlowRunsFilter = {}, prefix?: string): UseFilter<FlowRunsFilter> {
  return useUnionFilterFromRoute(FlowRunSortValuesSortParam, defaultValue, prefix)
}

export function useRecentFlowRunsFilter(defaultValue: FlowRunsFilter): UseFilter<FlowRunsFilter> {
  const { filter, ...params } = useFlowRunsFilter()

  params.flowRuns.expectedStartTimeAfter.value = dateFunctions.subDays(dateFunctions.startOfToday(), 7)
  params.flowRuns.expectedStartTimeBefore.value = dateFunctions.addDays(dateFunctions.endOfToday(), 1)

  return {
    ...params,
    filter,
    ...useFilterExtras(filter, defaultValue),
  }
}

export function useTaskRunsFilterFromRoute(defaultValue: TaskRunsFilter = {}, prefix?: string): UseFilter<TaskRunsFilter> {
  return useUnionFilterFromRoute(TaskRunSortValuesSortParam, defaultValue, prefix)
}

export function useDeploymentsFilterFromRoute(defaultValue: DeploymentsFilter = {}, prefix?: string): UseFilter<DeploymentsFilter> {
  return useUnionFilterFromRoute(DeploymentSortValuesSortParam, defaultValue, prefix)
}
