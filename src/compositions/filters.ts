import { BooleanRouteParam, DateRouteParam, NullableBooleanRouteParam, NumberRouteParam, RouteQueryParamsSchema, StringRouteParam, getLocationQueryForSchema, useRouteQueryParams } from '@prefecthq/vue-compositions'
import debounce from 'lodash.debounce'
import isEqual from 'lodash.isequal'
import { Ref, reactive, ComputedRef, toRef, computed, toRefs, isReactive, watch } from 'vue'
import { LocationQuery } from 'vue-router'
import { BlockDocumentSortValuesSortParam } from '@/formatters/BlockDocumentSortValuesParam'
import { DeploymentSortValuesSortParam } from '@/formatters/DeploymentSortValuesSortParam'
import { FlowRunSortValuesSortParam } from '@/formatters/FlowRunSortValuesSortParam'
import { FlowSortValuesSortParam } from '@/formatters/FlowSortValuesSortParam'
import { OperatorRouteParam } from '@/formatters/OperatorRouteParam'
import { TaskRunSortValuesSortParam } from '@/formatters/TaskRunSortValuesSortParam'
import { BlockDocumentFilter, BlockDocumentsFilter, BlockSchemaFilter, BlockSchemasFilter, BlockTypeFilter, BlockTypesFilter, DeploymentFilter, DeploymentsFilter, FlowFilter, FlowRunFilter, FlowRunsFilter, FlowRunsHistoryFilter, FlowsFilter, StateFilter, TagFilter, TaskRunFilter, TaskRunsFilter, UnionFilter, VariableFilter, VariablesFilter, WorkPoolFilter, WorkPoolQueueFilter, WorkPoolsFilter } from '@/models/Filters'
import { defaultDeploymentSort, defaultFlowRunSort, defaultFlowSort, defaultTaskRunSort, defaultVariableSort } from '@/types'
import { AnyRecord } from '@/types/any'
import { MaybeReactive } from '@/types/reactivity'
import { merge } from '@/utilities/object'
import { dateFunctions } from '@/utilities/timezone'

type AnySortableRecord = AnyRecord & { sort?: string }

export type Filter<T extends AnyRecord> = {
  [P in keyof Required<T>]: [T[P]] extends [AnyRecord | undefined]
    ? Filter<Exclude<T[P], undefined>>
    : T[P]
}

export type FilterFunctions<T extends AnyRecord> = {
  clear: () => void,
  set: (filters: T) => void,
  isDefaultFilter: ComputedRef<boolean>,
  isCustomFilter: ComputedRef<boolean>,
}

export type UseFilter<T extends AnyRecord> = {
  filter: Filter<T>,
} & FilterFunctions<T>

function withFilterFunctions<T extends AnyRecord>(filter: Filter<T>, defaultValue?: T): UseFilter<T> {
  const defaultValueCopy: T = JSON.parse(JSON.stringify(defaultValue ?? filter))

  const clear = (): void => {
    merge(filter as T, defaultValueCopy)
  }

  const set = (newFilters: T): void => {
    merge(filter as T, newFilters)
  }

  const isDefaultFilter = computed(() => JSON.stringify(filter) === JSON.stringify(defaultValueCopy))
  const isCustomFilter = computed(() => !isDefaultFilter.value)

  return {
    filter,
    clear,
    set,
    isDefaultFilter,
    isCustomFilter,
  }
}

function getDefaultValueWithDefaultSort<T extends AnySortableRecord>(defaultValue: MaybeReactive<T>, defaultSort: T['sort']): T {
  const { sort = defaultSort, ...rest } = isReactive(defaultValue) ? toRefs(defaultValue) : defaultValue

  return reactive({ ...rest, sort }) as T
}

function syncFilterWithFilterFromRoute<T extends AnyRecord>(filter: Filter<T>, query: Filter<T>): void {
  merge(filter, query)

  watch(filter, () => {
    merge(query, filter)
  })

  const updateFiltersFromQuery = debounce(() => {
    const equal = isEqual(filter, query)

    if (!equal) {
      merge(filter, query)
    }
  }, 100)

  watch(query, () => {
    updateFiltersFromQuery()
  }, { deep: true })
}

function useFilterFromRoute<T extends AnyRecord>(schema: RouteQueryParamsSchema<T>, defaultValue: MaybeReactive<T>, prefix?: string): UseFilter<T> {
  const defaultValueReactive = reactive(defaultValue) as T
  const params = useRouteQueryParams(schema, defaultValueReactive, prefix)
  const filter = reactive(params) as Filter<T>
  const response = withFilterFunctions(filter)

  return response
}

// eslint-disable-next-line max-params
function useSortableFilterFromRoute<T extends AnySortableRecord>(
  schema: RouteQueryParamsSchema<T>,
  defaultValue: MaybeReactive<T>,
  defaultSort: T['sort'],
  prefix?: string,
): UseFilter<T> {
  const defaultValueReactive = getDefaultValueWithDefaultSort(defaultValue, defaultSort)

  return useFilterFromRoute(schema, defaultValueReactive, prefix)
}

export function useTagFilter(defaultValue: MaybeReactive<TagFilter> = {}): UseFilter<TagFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const filter: Filter<TagFilter> = reactive({
    operator: toRef(defaultValueReactive, 'operator'),
    name: toRef(defaultValueReactive, 'name'),
    isNull: toRef(defaultValueReactive, 'isNull'),
  })

  return withFilterFunctions(filter)
}

const tagFilterSchema: RouteQueryParamsSchema<TagFilter> = {
  operator: OperatorRouteParam,
  name: [StringRouteParam],
  isNull: BooleanRouteParam,
}

export function useStateFilter(defaultValue: MaybeReactive<StateFilter> = {}): UseFilter<StateFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const filter: Filter<StateFilter> = reactive({
    operator: toRef(defaultValueReactive, 'operator'),
    name: toRef(defaultValueReactive, 'name'),
    type: toRef(defaultValueReactive, 'type'),
  })

  return withFilterFunctions(filter)
}

const stateFilterSchema: RouteQueryParamsSchema<StateFilter> = {
  operator: OperatorRouteParam,
  type: [StringRouteParam],
  name: [StringRouteParam],
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

  return withFilterFunctions(filter)
}

const flowFilterSchema: RouteQueryParamsSchema<FlowFilter> = {
  operator: OperatorRouteParam,
  id: [StringRouteParam],
  name: [StringRouteParam],
  nameLike: StringRouteParam,
  tags: tagFilterSchema,
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
    parentFlowRunId: toRef(defaultValueReactive, 'parentFlowRunId'),
    startTimeAfter: toRef(defaultValueReactive, 'startTimeAfter'),
    startTimeBefore: toRef(defaultValueReactive, 'startTimeBefore'),
    startTimeNull: toRef(defaultValueReactive, 'startTimeNull'),
    state: state.filter,
    tags: tags.filter,
    workQueueName: toRef(defaultValueReactive, 'workQueueName'),
    workQueueNameIsNull: toRef(defaultValueReactive, 'workQueueNameIsNull'),
    workQueueNameOperator: toRef(defaultValueReactive, 'workQueueNameOperator'),
  })

  return withFilterFunctions(filter)
}

const flowRunFilterSchema: RouteQueryParamsSchema<FlowRunFilter> = {
  operator: OperatorRouteParam,
  id: [StringRouteParam],
  notId: [StringRouteParam],
  name: [StringRouteParam],
  nameLike: StringRouteParam,
  tags: tagFilterSchema,
  deploymentIdOperator: OperatorRouteParam,
  deploymentId: [StringRouteParam],
  deploymentIdNull: BooleanRouteParam,
  workQueueNameOperator: OperatorRouteParam,
  workQueueName: [StringRouteParam],
  workQueueNameIsNull: BooleanRouteParam,
  state: stateFilterSchema,
  flowVersion: [StringRouteParam],
  expectedStartTimeBefore: DateRouteParam,
  expectedStartTimeAfter: DateRouteParam,
  nextExpectedStartTimeBefore: DateRouteParam,
  nextExpectedStartTimeAfter: DateRouteParam,
  startTimeBefore: DateRouteParam,
  startTimeAfter: DateRouteParam,
  startTimeNull: BooleanRouteParam,
  parentTaskRunIdOperator: OperatorRouteParam,
  parentTaskRunId: [StringRouteParam],
  parentTaskRunIdNull: BooleanRouteParam,
  parentFlowRunId: [StringRouteParam],
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

  return withFilterFunctions(filter)
}

const taskRunFilterSchema: RouteQueryParamsSchema<TaskRunFilter> = {
  operator: OperatorRouteParam,
  id: [StringRouteParam],
  name: [StringRouteParam],
  nameLike: StringRouteParam,
  tags: tagFilterSchema,
  state: stateFilterSchema,
  startTimeBefore: DateRouteParam,
  startTimeAfter: DateRouteParam,
  startTimeNull: BooleanRouteParam,
  subFlowRunsExist: BooleanRouteParam,
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

  return withFilterFunctions(filter)
}

const deploymentFilterSchema: RouteQueryParamsSchema<DeploymentFilter> = {
  operator: OperatorRouteParam,
  id: [StringRouteParam],
  name: [StringRouteParam],
  nameLike: StringRouteParam,
  isScheduleActive: BooleanRouteParam,
  workQueueName: [StringRouteParam],
  tags: tagFilterSchema,
}

export function useWorkPoolFilter(defaultValue: MaybeReactive<WorkPoolFilter> = {}): UseFilter<WorkPoolFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const filter: Filter<WorkPoolFilter> = reactive({
    operator: toRef(defaultValueReactive, 'operator'),
    id: toRef(defaultValueReactive, 'id'),
    name: toRef(defaultValueReactive, 'name'),
    type: toRef(defaultValueReactive, 'type'),
  })

  return withFilterFunctions(filter)
}

const workPoolFilterSchema: RouteQueryParamsSchema<WorkPoolFilter> = {
  operator: OperatorRouteParam,
  id: [StringRouteParam],
  name: [StringRouteParam],
  type: [StringRouteParam],
}

export function useWorkPoolQueueFilter(defaultValue: MaybeReactive<WorkPoolQueueFilter> = {}): UseFilter<WorkPoolQueueFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const filter: Filter<WorkPoolQueueFilter> = reactive({
    operator: toRef(defaultValueReactive, 'operator'),
    id: toRef(defaultValueReactive, 'id'),
    name: toRef(defaultValueReactive, 'name'),
  })

  return withFilterFunctions(filter)
}

const workPoolQueueFilterSchema: RouteQueryParamsSchema<WorkPoolQueueFilter> = {
  operator: OperatorRouteParam,
  id: [StringRouteParam],
  name: [StringRouteParam],
}

export function useBlockTypeFilter(defaultValue: MaybeReactive<BlockTypeFilter> = {}): UseFilter<BlockTypeFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const filter: Filter<BlockTypeFilter> = reactive({
    nameLike: toRef(defaultValueReactive, 'nameLike'),
    slug: toRef(defaultValueReactive, 'slug'),
  })

  return withFilterFunctions(filter)
}

const blockTypeFilterSchema: RouteQueryParamsSchema<BlockTypeFilter> = {
  nameLike: StringRouteParam,
  slug: [StringRouteParam],
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

  return withFilterFunctions(filter)
}

const blockSchemaFilterSchema: RouteQueryParamsSchema<BlockSchemaFilter> = {
  operator: OperatorRouteParam,
  id: [StringRouteParam],
  blockTypeId: [StringRouteParam],
  blockCapabilities: [StringRouteParam],
  version: [StringRouteParam],
}

export function useBlockDocumentFilter(defaultValue: MaybeReactive<BlockDocumentFilter> = {}): UseFilter<BlockDocumentFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const filter: Filter<BlockDocumentFilter> = reactive({
    operator: toRef(defaultValueReactive, 'operator'),
    id: toRef(defaultValueReactive, 'id'),
    isAnonymous: toRef(defaultValueReactive, 'isAnonymous'),
    blockTypeId: toRef(defaultValueReactive, 'blockTypeId'),
    name: toRef(defaultValueReactive, 'name'),
    nameLike: toRef(defaultValueReactive, 'nameLike'),
  })

  return withFilterFunctions(filter)
}

const blockDocumentFilterSchema: RouteQueryParamsSchema<BlockDocumentFilter> = {
  operator: OperatorRouteParam,
  id: [StringRouteParam],
  isAnonymous: NullableBooleanRouteParam,
  blockTypeId: [StringRouteParam],
  name: [StringRouteParam],
  nameLike: StringRouteParam,
}

export function useBlockTypesFilter(defaultValue: MaybeReactive<BlockTypesFilter> = {}): UseFilter<BlockTypesFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const blockTypes = useBlockTypeFilter(defaultValueReactive.blockTypes)
  const blockSchemas = useBlockSchemaFilter(defaultValueReactive.blockSchemas)
  const filter: Filter<BlockTypesFilter> = reactive({
    blockSchemas: blockSchemas.filter,
    blockTypes: blockTypes.filter,
    limit: toRef(defaultValueReactive, 'limit'),
    offset: toRef(defaultValueReactive, 'offset'),
  })

  return withFilterFunctions(filter)
}

const blockTypesFilterSchema: RouteQueryParamsSchema<BlockTypesFilter> = {
  blockTypes: blockTypeFilterSchema,
  blockSchemas: blockSchemaFilterSchema,
  limit: NumberRouteParam,
  offset: NumberRouteParam,
}

export function useBlockTypesFilterFromRoute(defaultValue: MaybeReactive<BlockTypesFilter> = {}, prefix?: string): UseFilter<BlockTypesFilter> {
  const response = useBlockTypesFilter(defaultValue)
  const { filter: query } = useFilterFromRoute(blockTypesFilterSchema, defaultValue, prefix)

  syncFilterWithFilterFromRoute(response.filter, query)

  return response
}

export function useBlockSchemasFilter(defaultValue: MaybeReactive<BlockSchemasFilter> = {}): UseFilter<BlockSchemasFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const blockSchemas = useBlockSchemaFilter(defaultValueReactive.blockSchemas)
  const filter: Filter<BlockSchemasFilter> = reactive({
    blockSchemas: blockSchemas.filter,
    limit: toRef(defaultValueReactive, 'limit'),
    offset: toRef(defaultValueReactive, 'offset'),
  })

  return withFilterFunctions(filter)
}

const blockSchemasFilterSchema: RouteQueryParamsSchema<BlockSchemasFilter> = {
  blockSchemas: blockSchemaFilterSchema,
  limit: NumberRouteParam,
  offset: NumberRouteParam,
}

export function useBlockSchemasFilterFromRoute(defaultValue: MaybeReactive<BlockSchemasFilter> = {}, prefix?: string): UseFilter<BlockSchemasFilter> {
  const response = useBlockSchemasFilter(defaultValue)
  const { filter: query } = useFilterFromRoute(blockSchemasFilterSchema, defaultValue, prefix)

  syncFilterWithFilterFromRoute(response.filter, query)

  return response
}

export function useBlockDocumentsFilter(defaultValue: MaybeReactive<BlockDocumentsFilter> = {}): UseFilter<BlockDocumentsFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const blockTypes = useBlockTypeFilter(defaultValueReactive.blockTypes)
  const blockSchemas = useBlockSchemaFilter(defaultValueReactive.blockSchemas)
  const blockDocuments = useBlockDocumentFilter(defaultValueReactive.blockDocuments)
  const filter: Filter<BlockDocumentsFilter> = reactive({
    blockTypes: blockTypes.filter,
    blockSchemas: blockSchemas.filter,
    blockDocuments: blockDocuments.filter,
    includeSecrets: toRef(defaultValueReactive, 'includeSecrets'),
    limit: toRef(defaultValueReactive, 'limit'),
    offset: toRef(defaultValueReactive, 'offset'),
    sort: toRef(defaultValueReactive, 'sort'),
  })

  return withFilterFunctions(filter)
}

const blockDocumentsFilterSchema: RouteQueryParamsSchema<BlockDocumentsFilter> = {
  blockTypes: blockTypeFilterSchema,
  blockSchemas: blockSchemaFilterSchema,
  blockDocuments: blockDocumentFilterSchema,
  limit: NumberRouteParam,
  offset: NumberRouteParam,
  includeSecrets: BooleanRouteParam,
  sort: BlockDocumentSortValuesSortParam,
}

export function useBlockDocumentsFilterFromRoute(defaultValue: MaybeReactive<BlockDocumentsFilter> = {}, prefix?: string): UseFilter<BlockDocumentsFilter> {
  const response = useBlockDocumentsFilter(defaultValue)
  const { filter: query } = useFilterFromRoute(blockDocumentsFilterSchema, defaultValue, prefix)

  syncFilterWithFilterFromRoute(response.filter, query)

  return response
}

export function useWorkPoolsFilter(defaultValue: MaybeReactive<WorkPoolsFilter> = {}): UseFilter<WorkPoolsFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const workPools = useWorkPoolFilter(defaultValueReactive.workPools)
  const filter: Filter<WorkPoolsFilter> = reactive({
    offset: toRef(defaultValueReactive, 'offset'),
    limit: toRef(defaultValueReactive, 'limit'),
    workPools: workPools.filter,
  })

  return withFilterFunctions(filter)
}

const workPoolsFilterSchema: RouteQueryParamsSchema<WorkPoolsFilter> = {
  workPools: workPoolFilterSchema,
  offset: NumberRouteParam,
  limit: NumberRouteParam,
}

export function useWorkPoolsFilterFromRoute(defaultValue: MaybeReactive<WorkPoolsFilter> = {}, prefix?: string): UseFilter<WorkPoolsFilter> {
  const response = useWorkPoolsFilter(defaultValue)
  const { filter: query } = useFilterFromRoute(workPoolsFilterSchema, defaultValue, prefix)

  syncFilterWithFilterFromRoute(response.filter, query)

  return response
}

function useUnionFilter<T extends UnionFilter>(defaultValue: MaybeReactive<T>, defaultSort: Exclude<T['sort'], undefined>): UseFilter<T> {
  const defaultValueReactive = getDefaultValueWithDefaultSort(defaultValue, defaultSort)
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

  return withFilterFunctions(filter)
}

export function useFlowsFilter(defaultValue: MaybeReactive<FlowsFilter> = {}): UseFilter<FlowsFilter> {
  return useUnionFilter<FlowsFilter>(defaultValue, defaultFlowSort)
}

export function useFlowRunsFilter(defaultValue: MaybeReactive<FlowRunsFilter> = {}): UseFilter<FlowRunsFilter> {
  return useUnionFilter<FlowRunsFilter>(defaultValue, defaultFlowRunSort)
}

export function useTaskRunsFilter(defaultValue: MaybeReactive<TaskRunsFilter> = {}): UseFilter<TaskRunsFilter> {
  return useUnionFilter<TaskRunsFilter>(defaultValue, defaultTaskRunSort)
}

export function useDeploymentsFilter(defaultValue: MaybeReactive<DeploymentsFilter> = {}): UseFilter<DeploymentsFilter> {
  return useUnionFilter<DeploymentsFilter>(defaultValue, defaultDeploymentSort)
}

export function useVariableFilter(defaultValue: MaybeReactive<VariableFilter> = {}): UseFilter<VariableFilter> {
  const defaultValueReactive = reactive(defaultValue)
  const tags = useTagFilter(defaultValueReactive.tags)
  const filter: Filter<VariableFilter> = reactive({
    id: toRef(defaultValueReactive, 'id'),
    name: toRef(defaultValueReactive, 'name'),
    nameLike: toRef(defaultValueReactive, 'nameLike'),
    value: toRef(defaultValueReactive, 'value'),
    valueLike: toRef(defaultValueReactive, 'valueLike'),
    tags: tags.filter,
  })

  return withFilterFunctions(filter)
}

export function useVariablesFilter(defaultValue: MaybeReactive<VariablesFilter> = {}): UseFilter<VariablesFilter> {
  const defaultValueReactive = getDefaultValueWithDefaultSort(defaultValue, defaultVariableSort)

  const filter: Filter<VariablesFilter> = reactive({
    variables: useVariableFilter(defaultValueReactive.variables).filter,
    offset: defaultValueReactive.offset,
    limit: defaultValueReactive.limit,
    sort: defaultValueReactive.sort,
  })

  return withFilterFunctions(filter)
}

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

const flowsFilterSchema: RouteQueryParamsSchema<FlowsFilter> = {
  ...unionFilterSchema,
  sort: FlowSortValuesSortParam,
}

export function useFlowsFilterFromRoute(defaultValue: MaybeReactive<FlowsFilter> = {}, prefix?: string): UseFilter<FlowsFilter> {
  const response = useFlowsFilter(defaultValue)
  const { filter: query } = useSortableFilterFromRoute(flowsFilterSchema, defaultValue, defaultFlowSort, prefix)

  syncFilterWithFilterFromRoute(response.filter, query)

  return response
}

const flowRunsFilterSchema: RouteQueryParamsSchema<FlowRunsFilter> = {
  ...unionFilterSchema,
  sort: FlowRunSortValuesSortParam,
}

export function useFlowRunsFilterFromRoute(defaultValue: MaybeReactive<FlowRunsFilter> = {}, prefix?: string): UseFilter<FlowRunsFilter> {
  const response = useFlowRunsFilter(defaultValue)
  const { filter: query } = useSortableFilterFromRoute(flowRunsFilterSchema, defaultValue, defaultFlowRunSort, prefix)

  syncFilterWithFilterFromRoute(response.filter, query)

  return response
}

export function getQueryForFlowRunsFilter(filter: FlowRunsFilter): LocationQuery {
  const query = getLocationQueryForSchema(flowRunsFilterSchema, filter)
  return query
}

const taskRunsFilterSchema: RouteQueryParamsSchema<TaskRunsFilter> = {
  ...unionFilterSchema,
  sort: TaskRunSortValuesSortParam,
}

export function useTaskRunsFilterFromRoute(defaultValue: MaybeReactive<TaskRunsFilter> = {}, prefix?: string): UseFilter<TaskRunsFilter> {
  const response = useTaskRunsFilter(defaultValue)
  const { filter: query } = useSortableFilterFromRoute(taskRunsFilterSchema, defaultValue, defaultTaskRunSort, prefix)

  syncFilterWithFilterFromRoute(response.filter, query)

  return response
}

const deploymentsFilterSchema: RouteQueryParamsSchema<DeploymentsFilter> = {
  ...unionFilterSchema,
  sort: DeploymentSortValuesSortParam,
}

export function useDeploymentsFilterFromRoute(defaultValue: MaybeReactive<DeploymentsFilter> = {}, prefix?: string): UseFilter<DeploymentsFilter> {
  const response = useDeploymentsFilter(defaultValue)
  const { filter: query } = useSortableFilterFromRoute(deploymentsFilterSchema, defaultValue, defaultDeploymentSort, prefix)

  syncFilterWithFilterFromRoute(response.filter, query)

  return response
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

export function useRecentFlowRunsFilterFromRoute(defaultValue: MaybeReactive<FlowRunsFilter> = {}, prefix?: string): UseFilter<FlowRunsFilter> {
  const response = useRecentFlowRunsFilter(defaultValue)
  const { filter: query } = useSortableFilterFromRoute(flowRunsFilterSchema, defaultValue, defaultFlowRunSort, prefix)

  syncFilterWithFilterFromRoute(response.filter, query)

  return response
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

  return withFilterFunctions(filter)
}

const flowRunsHistoryFilterSchema: RouteQueryParamsSchema<FlowRunsHistoryFilter> = {
  ...unionFilterSchema,
  historyEnd: DateRouteParam,
  historyStart: DateRouteParam,
  historyIntervalSeconds: NumberRouteParam,
  sort: FlowRunSortValuesSortParam,
}

export function useFlowRunsHistoryFilterFromRoute(defaultValue: MaybeReactive<FlowRunsHistoryFilter>, prefix?: string): UseFilter<FlowRunsHistoryFilter> {
  const response = useFlowRunsHistoryFilter(defaultValue)
  const { filter: query } = useSortableFilterFromRoute(flowRunsHistoryFilterSchema, defaultValue, defaultFlowRunSort, prefix)

  syncFilterWithFilterFromRoute(response.filter, query)

  return response
}
