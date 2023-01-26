import { BooleanRouteParam, DateRouteParam, NumberRouteParam, RouteQueryParamsSchema, StringRouteParam, useRouteQueryParams } from '@prefecthq/vue-compositions'
import { Ref, reactive, ComputedRef, toRef, computed, ref } from 'vue'
import { DeploymentSortValuesSortParam } from '@/formatters/DeploymentSortValuesSortParam'
import { FlowRunSortValuesSortParam } from '@/formatters/FlowRunSortValuesSortParam'
import { FlowSortValuesSortParam } from '@/formatters/FlowSortValuesSortParam'
import { OperatorRouteParam } from '@/formatters/OperatorRouteParam'
import { TaskRunSortValuesSortParam } from '@/formatters/TaskRunSortValuesSortParam'
import { BlockDocumentFilter, BlockSchemaFilter, BlockTypeFilter, DeploymentFilter, DeploymentsFilter, FlowFilter, FlowRunFilter, FlowRunsFilter, FlowRunsHistoryFilter, FlowsFilter, StateFilter, TagFilter, TaskRunFilter, TaskRunsFilter, UnionFilter, UnionFilterSort, WorkPoolFilter, WorkPoolQueueFilter, WorkPoolsFilter } from '@/models/Filters'
import { MaybeReactive } from '@/types'
import { merge } from '@/utilities/object'
import { dateFunctions } from '@/utilities/timezone'

type ExpandRecursively<T> = T extends object
  ? T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never
  : T

type AnyRecord = Record<PropertyKey, unknown>

type Filters<T extends AnyRecord> = Required<{
  [Property in keyof T]: NonNullable<T[Property]> extends Record<PropertyKey, unknown>
    ? Filters<NonNullable<T[Property]>> | undefined
    : Ref<T[Property]>
}>

type FilterWithExtras<T extends AnyRecord> = T & {
  clear: () => void,
  set: (filters: T) => void,
  exist: ComputedRef<boolean>,
}

type UseFilter<T extends AnyRecord> = Filters<T> & { filter: FilterWithExtras<T> }


export type Filter<T extends AnyRecord> = {
  [P in keyof Required<T>]: [T[P]] extends [undefined]
    ? 'true'
    : 'false'
}

export type RouteQueryParams<T extends AnyRecord> = {
  [P in keyof T]-?: T[P] extends [AnyRecord | undefined]
    ? [T[P]] extends [AnyRecord]
      ? RouteQueryParams<T[P]>
      : true
    : Ref<T[P]>
}


type Test = ExpandRecursively<Filter<FlowFilter>>
type Test2 = ExpandRecursively<RouteQueryParams<FlowFilter>>

function withExtras<T extends AnyRecord>(filters: T): FilterWithExtras<T> {
  const internalFilters = filters
  const defaultValue: T = JSON.parse(JSON.stringify(filters))

  const clear = (): void => {
    Object.assign(filters, defaultValue)
  }

  const set = (filters: T): void => {
    merge(internalFilters, filters)
  }

  const exist = computed(() => JSON.stringify(filters) === JSON.stringify(defaultValue))

  return Object.assign(filters, {
    clear,
    set,
    exist,
  })
}

export function useTagFilter(defaultValue: MaybeReactive<TagFilter> = {}): UseFilter<TagFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const operator = toRef(defaultValueReactive, 'operator')
  const name = toRef(defaultValueReactive, 'name')
  const isNull = toRef(defaultValueReactive, 'isNull')
  const filter = reactive({
    operator,
    name,
    isNull,
  })

  return {
    operator,
    name,
    isNull,
    filter: withExtras<TagFilter>(filter),
  }
}

const tagFilterSchema: RouteQueryParamsSchema<TagFilter> = {
  operator: OperatorRouteParam,
  name: StringRouteParam,
  isNull: BooleanRouteParam,
}

export function useTagFilterFromRoute(defaultValue: MaybeReactive<TagFilter> = {}, prefix?: string): UseFilter<TagFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const params = useRouteQueryParams(tagFilterSchema, defaultValueReactive, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter: withExtras<TagFilter>(filter),
  }
}

export function useStateFilter(defaultValue: MaybeReactive<StateFilter> = {}): UseFilter<StateFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const operator = toRef(defaultValueReactive, 'operator')
  const name = toRef(defaultValueReactive, 'name')
  const type = toRef(defaultValueReactive, 'type')
  const filter = reactive({
    operator,
    name,
    type,
  })

  return {
    operator,
    name,
    type,
    filter: withExtras<StateFilter>(filter),
  }
}

const stateFilterSchema: RouteQueryParamsSchema<StateFilter> = {
  operator: OperatorRouteParam,
  type: StringRouteParam,
  name: StringRouteParam,
}

export function useStateFilterFromRoute(defaultValue: MaybeReactive<StateFilter> = {}, prefix?: string): UseFilter<StateFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const params = useRouteQueryParams(stateFilterSchema, defaultValueReactive, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter: withExtras<StateFilter>(filter),
  }
}

export function useFlowFilter(defaultValue: MaybeReactive<FlowFilter> = {}): UseFilter<FlowFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const operator = toRef(defaultValueReactive, 'operator')
  const id = toRef(defaultValueReactive, 'id')
  const name = toRef(defaultValueReactive, 'name')
  const nameLike = toRef(defaultValueReactive, 'nameLike')
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
    filter: withExtras<FlowFilter>(filter),
  }
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
  const filter = reactive(params)

  return {
    ...params,
    filter: withExtras<FlowFilter>(filter),
  }
}

export function useFlowRunFilter(defaultValue: MaybeReactive<FlowRunFilter> = {}): UseFilter<FlowRunFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const operator = toRef(defaultValueReactive, 'operator')
  const id = toRef(defaultValueReactive, 'id')
  const notId = toRef(defaultValueReactive, 'notId')
  const name = toRef(defaultValueReactive, 'name')
  const nameLike = toRef(defaultValueReactive, 'nameLike')
  const tags = useTagFilter()
  const deploymentIdOperator = toRef(defaultValueReactive, 'deploymentIdOperator')
  const deploymentId = toRef(defaultValueReactive, 'deploymentId')
  const deploymentIdNull = toRef(defaultValueReactive, 'deploymentIdNull')
  const workQueueNameOperator = toRef(defaultValueReactive, 'workQueueNameOperator')
  const workQueueName = toRef(defaultValueReactive, 'workQueueName')
  const workQueueNameIsNull = toRef(defaultValueReactive, 'workQueueNameIsNull')
  const state = useStateFilter()
  const flowVersion = toRef(defaultValueReactive, 'flowVersion')
  const expectedStartTimeBefore = toRef(defaultValueReactive, 'expectedStartTimeBefore')
  const expectedStartTimeAfter = toRef(defaultValueReactive, 'expectedStartTimeAfter')
  const nextExpectedStartTimeBefore = toRef(defaultValueReactive, 'nextExpectedStartTimeBefore')
  const nextExpectedStartTimeAfter = toRef(defaultValueReactive, 'nextExpectedStartTimeAfter')
  const startTimeBefore = toRef(defaultValueReactive, 'startTimeBefore')
  const startTimeAfter = toRef(defaultValueReactive, 'startTimeAfter')
  const startTimeNull = toRef(defaultValueReactive, 'startTimeNull')
  const parentTaskRunIdOperator = toRef(defaultValueReactive, 'parentTaskRunIdOperator')
  const parentTaskRunId = toRef(defaultValueReactive, 'parentTaskRunId')
  const parentTaskRunIdNull = toRef(defaultValueReactive, 'parentTaskRunIdNull')
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
    filter: withExtras<FlowRunFilter>(filter),
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

export function useFlowRunFilterFromRoute(defaultValue: MaybeReactive<FlowRunFilter> = {}, prefix?: string): UseFilter<FlowRunFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const params = useRouteQueryParams(flowRunFilterSchema, defaultValueReactive, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter: withExtras<FlowRunFilter>(filter),
  }
}

export function useTaskRunFilter(defaultValue: MaybeReactive<TaskRunFilter> = {}): UseFilter<TaskRunFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const operator = toRef(defaultValueReactive, 'operator')
  const id = toRef(defaultValueReactive, 'id')
  const name = toRef(defaultValueReactive, 'name')
  const nameLike = toRef(defaultValueReactive, 'nameLike')
  const tags = useTagFilter(defaultValueReactive.tags)
  const state = useStateFilter(defaultValueReactive.state)
  const startTimeBefore = toRef(defaultValueReactive, 'startTimeBefore')
  const startTimeAfter = toRef(defaultValueReactive, 'startTimeAfter')
  const startTimeNull = toRef(defaultValueReactive, 'startTimeNull')
  const subFlowRunsExist = toRef(defaultValueReactive, 'subFlowRunsExist')
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
    filter: withExtras<TaskRunFilter>(filter),
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

export function useTaskRunFilterFromRoute(defaultValue: MaybeReactive<TaskRunFilter> = {}, prefix?: string): UseFilter<TaskRunFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const params = useRouteQueryParams(taskRunFilterSchema, defaultValueReactive, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter: withExtras<TaskRunFilter>(filter),
  }
}

export function useDeploymentFilter(defaultValue: MaybeReactive<DeploymentFilter> = {}): UseFilter<DeploymentFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const operator = toRef(defaultValueReactive, 'operator')
  const id = toRef(defaultValueReactive, 'id')
  const name = toRef(defaultValueReactive, 'name')
  const nameLike = toRef(defaultValueReactive, 'nameLike')
  const isScheduleActive = toRef(defaultValueReactive, 'isScheduleActive')
  const workQueueName = toRef(defaultValueReactive, 'workQueueName')
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
    filter: withExtras<DeploymentFilter>(filter),
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

export function useDeploymentFilterFromRoute(defaultValue: MaybeReactive<DeploymentFilter> = {}, prefix?: string): UseFilter<DeploymentFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const params = useRouteQueryParams(deploymentFilterSchema, defaultValueReactive, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter: withExtras<DeploymentFilter>(filter),
  }
}

export function useWorkPoolFilter(defaultValue: MaybeReactive<WorkPoolFilter> = {}): UseFilter<WorkPoolFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const operator = toRef(defaultValueReactive, 'operator')
  const id = toRef(defaultValueReactive, 'id')
  const name = toRef(defaultValueReactive, 'name')
  const type = toRef(defaultValueReactive, 'type')
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
    filter: withExtras<WorkPoolFilter>(filter),
  }
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
  const filter = reactive(params)

  return {
    ...params,
    filter: withExtras<WorkPoolFilter>(filter),
  }
}

export function useWorkPoolQueueFilter(defaultValue: MaybeReactive<WorkPoolQueueFilter> = {}): UseFilter<WorkPoolQueueFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const operator = toRef(defaultValueReactive, 'operator')
  const id = toRef(defaultValueReactive, 'id')
  const name = toRef(defaultValueReactive, 'name')
  const filter = reactive({
    operator,
    id,
    name,
  })

  return {
    operator,
    id,
    name,
    filter: withExtras<WorkPoolQueueFilter>(filter),
  }
}

const workPoolQueueFilterSchema: RouteQueryParamsSchema<WorkPoolQueueFilter> = {
  operator: OperatorRouteParam,
  id: StringRouteParam,
  name: StringRouteParam,
}

export function useWorkPoolQueueFilterFromRoute(defaultValue: MaybeReactive<WorkPoolQueueFilter> = {}, prefix?: string): UseFilter<WorkPoolQueueFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const params = useRouteQueryParams(workPoolQueueFilterSchema, defaultValueReactive, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter: withExtras<WorkPoolQueueFilter>(filter),
  }
}

export function useBlockTypeFilter(defaultValue: MaybeReactive<BlockTypeFilter> = {}): UseFilter<BlockTypeFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const nameLike = toRef(defaultValueReactive, 'nameLike')
  const slug = toRef(defaultValueReactive, 'slug')
  const filter = reactive({
    nameLike,
    slug,
  })

  return {
    nameLike,
    slug,
    filter: withExtras<BlockTypeFilter>(filter),
  }
}

const blockTypeFilterSchema: RouteQueryParamsSchema<BlockTypeFilter> = {
  nameLike: StringRouteParam,
  slug: StringRouteParam,
}

export function useBlockTypeFilterFromRoute(defaultValue: MaybeReactive<BlockTypeFilter> = {}, prefix?: string): UseFilter<BlockTypeFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const params = useRouteQueryParams(blockTypeFilterSchema, defaultValueReactive, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter: withExtras<BlockTypeFilter>(filter),
  }
}

export function useBlockSchemaFilter(defaultValue: MaybeReactive<BlockSchemaFilter> = {}): UseFilter<BlockSchemaFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const operator = toRef(defaultValueReactive, 'operator')
  const id = toRef(defaultValueReactive, 'id')
  const blockTypeId = toRef(defaultValueReactive, 'blockTypeId')
  const blockCapabilities = toRef(defaultValueReactive, 'blockCapabilities')
  const version = toRef(defaultValueReactive, 'version')
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
    filter: withExtras<BlockSchemaFilter>(filter),
  }
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
  const filter = reactive(params)

  return {
    ...params,
    filter: withExtras<BlockSchemaFilter>(filter),
  }
}

export function useBlockDocumentFilter(defaultValue: MaybeReactive<BlockDocumentFilter> = {}): UseFilter<BlockDocumentFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const operator = toRef(defaultValueReactive, 'operator')
  const id = toRef(defaultValueReactive, 'id')
  const isAnonymous = toRef(defaultValueReactive, 'isAnonymous')
  const blockTypeId = toRef(defaultValueReactive, 'blockTypeId')
  const name = toRef(defaultValueReactive, 'name')
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
    filter: withExtras<BlockDocumentFilter>(filter),
  }
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
  const filter = reactive(params)

  return {
    ...params,
    filter: withExtras<BlockDocumentFilter>(filter),
  }
}

export function useWorkPoolsFilter(defaultValue: MaybeReactive<WorkPoolsFilter> = {}): UseFilter<WorkPoolsFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const workPools = useWorkPoolFilter(defaultValueReactive.workPools)
  const offset = toRef(defaultValueReactive, 'offset')
  const limit = toRef(defaultValueReactive, 'limit')
  const filter = reactive({
    workPools: workPools.filter,
    offset,
    limit,
  })

  return {
    workPools,
    offset,
    limit,
    filter: withExtras<WorkPoolsFilter>(filter),
  }
}

const workPoolsFilterSchema: RouteQueryParamsSchema<WorkPoolsFilter> = {
  workPools: workPoolFilterSchema,
  offset: NumberRouteParam,
  limit: NumberRouteParam,
}

export function useWorkPoolsFilterFromRoute(defaultValue: MaybeReactive<WorkPoolsFilter> = {}, prefix?: string): UseFilter<WorkPoolsFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const params = useRouteQueryParams(workPoolsFilterSchema, defaultValueReactive, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter: withExtras<WorkPoolsFilter>(filter),
  }
}

export function useUnionFilter<T extends UnionFilter>(defaultValue: MaybeReactive<T>): UseFilter<T> {
  const defaultValueReactive = reactive(defaultValue) as T
  const { filter: flowsFilter, ...flows } = useFlowFilter(defaultValueReactive.flows)
  const { filter: flowRunsFilter, ...flowRuns } = useFlowRunFilter(defaultValueReactive.flowRuns)
  const { filter: taskRunsFilter, ...taskRuns } = useTaskRunFilter(defaultValueReactive.taskRuns)
  const { filter: deploymentsFilter, ...deployments } = useDeploymentFilter(defaultValueReactive.deployments)
  const { filter: workPoolsFilter, ...workPools } = useWorkPoolFilter(defaultValueReactive.workPools)
  const { filter: workPoolQueuesFilter, ...workPoolQueues } = useWorkPoolQueueFilter(defaultValueReactive.workPoolQueues)
  const sort = toRef(defaultValueReactive, 'sort') as Ref<T['sort']>
  const offset = toRef(defaultValueReactive, 'offset')
  const limit = toRef(defaultValueReactive, 'limit')
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

  return {
    flows,
    flowRuns,
    taskRuns,
    deployments,
    workPools,
    workPoolQueues,
    sort,
    offset,
    limit,
    filter: withExtras<T>(filter),
  } as UseFilter<T>
}

export const useFlowsFilter = (defaultValue: MaybeReactive<FlowsFilter> = {}): UseFilter<FlowsFilter> => useUnionFilter<FlowsFilter>(defaultValue)
export const useFlowRunsFilter = (defaultValue: MaybeReactive<FlowRunsFilter> = {}): UseFilter<FlowRunsFilter> => useUnionFilter<FlowRunsFilter>(defaultValue)
export const useTaskRunsFilter = (defaultValue: MaybeReactive<TaskRunsFilter> = {}): UseFilter<TaskRunsFilter> => useUnionFilter<TaskRunsFilter>(defaultValue)
export const useDeploymentsFilter = (defaultValue: MaybeReactive<DeploymentsFilter> = {}): UseFilter<DeploymentsFilter> => useUnionFilter<DeploymentsFilter>(defaultValue)

const foo: MaybeReactive<FlowsFilter> = {
  taskRuns: {
    name: ref(['']),
  },
}
const test = useFlowRunsFilter({
  taskRuns: {
    name: undefined,
  },
})
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
  const filter = reactive(params) as UnionFilter<T>

  return {
    ...params,
    filter: withExtras(filter),
  } as UseFilter<UnionFilter<T>>
}

export function useFlowsFilterFromRoute(defaultValue: MaybeReactive<FlowsFilter> = {}, prefix?: string): UseFilter<FlowsFilter> {
  return useUnionFilterFromRoute(FlowSortValuesSortParam, defaultValue, prefix)
}

export function useFlowRunsFilterFromRoute(defaultValue: MaybeReactive<FlowRunsFilter> = {}, prefix?: string): UseFilter<FlowRunsFilter> {
  return useUnionFilterFromRoute(FlowRunSortValuesSortParam, defaultValue, prefix)
}

export function useRecentFlowRunsFilter(defaultValue: MaybeReactive<FlowRunsFilter>): UseFilter<FlowRunsFilter> {
  const { filter, ...params } = useFlowRunsFilter(defaultValue)

  params.flowRuns.expectedStartTimeAfter.value = dateFunctions.subDays(dateFunctions.startOfToday(), 7)
  params.flowRuns.expectedStartTimeBefore.value = dateFunctions.addDays(dateFunctions.endOfToday(), 1)

  return {
    ...params,
    filter,
  }
}

export function useTaskRunsFilterFromRoute(defaultValue: MaybeReactive<TaskRunsFilter> = {}, prefix?: string): UseFilter<TaskRunsFilter> {
  return useUnionFilterFromRoute(TaskRunSortValuesSortParam, defaultValue, prefix)
}

export function useDeploymentsFilterFromRoute(defaultValue: MaybeReactive<DeploymentsFilter> = {}, prefix?: string): UseFilter<DeploymentsFilter> {
  return useUnionFilterFromRoute(DeploymentSortValuesSortParam, defaultValue, prefix)
}
