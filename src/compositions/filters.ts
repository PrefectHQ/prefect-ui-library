/* eslint-disable max-classes-per-file */
import { BooleanRouteParam, DateRouteParam, InvalidRouteParamValue, NumberRouteParam, RouteParam, RouteQueryParamsSchema, StringRouteParam, useRouteQueryParams } from '@prefecthq/vue-compositions'
import { Ref, ref, reactive } from 'vue'
import { LocationQueryValue } from 'vue-router'
import { BlockDocumentFilter, BlockSchemaFilter, BlockTypeFilter, DeploymentFilter, DeploymentsFilter, FlowFilter, FlowRunFilter, FlowRunsFilter, FlowsFilter, isOperation, Operation, StateFilter, TagFilter, TaskRunFilter, TaskRunsFilter, UnionFilter, UnionFilterSort } from '@/models/Filters'
import { DeploymentSortValues, FlowRunSortValues, FlowSortValues, isDeploymentSortValue, isFlowRunSortValue, isFlowSortValue, isTaskRunSortValue, TaskRunSortValues } from '@/types/SortOptionTypes'

type UseFilter<T extends Record<PropertyKey, unknown>> = Required<{
  [Property in keyof T]: NonNullable<T[Property]> extends Record<PropertyKey, unknown>
    ? Omit<UseFilter<NonNullable<T[Property]>>, 'filter'> | undefined
    : Ref<T[Property]>
}> & { filter: T }

export function useTagFilter(): UseFilter<TagFilter> {
  const operator = ref<TagFilter['operator']>()
  const name = ref<TagFilter['name']>()
  const isNull = ref<TagFilter['isNull']>()
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
  }
}

class OperatorRouteParam extends RouteParam<Operation> {
  protected override parse(value: LocationQueryValue): Operation {
    if (value === null || !isOperation(value)) {
      throw new InvalidRouteParamValue()
    }

    return value
  }

  protected override format(value: Operation): LocationQueryValue {
    return `${value}`
  }
}

const tagFilterSchema: RouteQueryParamsSchema<TagFilter> = {
  operator: OperatorRouteParam,
  name: StringRouteParam,
  isNull: BooleanRouteParam,
}

export function useTagFilterFromRoute(prefix?: string): UseFilter<TagFilter> {
  const params = useRouteQueryParams(tagFilterSchema, {}, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter,
  }
}

export function useStateFilter(): UseFilter<StateFilter> {
  const operator = ref<StateFilter['operator']>()
  const name = ref<StateFilter['name']>()
  const type = ref<StateFilter['type']>()
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
  }
}

const stateFilterSchema: RouteQueryParamsSchema<StateFilter> = {
  operator: OperatorRouteParam,
  type: StringRouteParam,
  name: StringRouteParam,
}

export function useStateFilterFromRoute(prefix?: string): UseFilter<StateFilter> {
  const params = useRouteQueryParams(stateFilterSchema, {}, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter,
  }
}

export function useFlowFilter(): UseFilter<FlowFilter> {
  const operator = ref<Operation>()
  const id = ref<string | string[]>()
  const name = ref<string | string[]>()
  const nameLike = ref<string>()
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
  }
}

const flowFilterSchema: RouteQueryParamsSchema<FlowFilter> = {
  operator: OperatorRouteParam,
  id: StringRouteParam,
  name: StringRouteParam,
  nameLike: StringRouteParam,
  tags: tagFilterSchema,
}

export function useFlowFilterFromRoute(prefix?: string): UseFilter<FlowFilter> {
  const params = useRouteQueryParams(flowFilterSchema, {}, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter,
  }
}

export function useFlowRunFilter(): UseFilter<FlowRunFilter> {
  const operator = ref<FlowRunFilter['operator']>()
  const id = ref<FlowRunFilter['id']>()
  const notId = ref<FlowRunFilter['notId']>()
  const name = ref<FlowRunFilter['name']>()
  const nameLike = ref<FlowRunFilter['nameLike']>()
  const tags = useTagFilter()
  const deploymentIdOperator = ref<FlowRunFilter['deploymentIdOperator']>()
  const deploymentId = ref<FlowRunFilter['deploymentId']>()
  const deploymentIdNull = ref<FlowRunFilter['deploymentIdNull']>()
  const workQueueNameOperator = ref<FlowRunFilter['workQueueNameOperator']>()
  const workQueueName = ref<FlowRunFilter['workQueueName']>()
  const workQueueNameIsNull = ref<FlowRunFilter['workQueueNameIsNull']>()
  const state = useStateFilter()
  const flowVersion = ref<FlowRunFilter['flowVersion']>()
  const expectedStartTimeBefore = ref<FlowRunFilter['expectedStartTimeBefore']>()
  const expectedStartTimeAfter = ref<FlowRunFilter['expectedStartTimeAfter']>()
  const nextExpectedStartTimeBefore = ref<FlowRunFilter['nextExpectedStartTimeBefore']>()
  const nextExpectedStartTimeAfter = ref<FlowRunFilter['nextExpectedStartTimeAfter']>()
  const startTimeBefore = ref<FlowRunFilter['startTimeBefore']>()
  const startTimeAfter = ref<FlowRunFilter['startTimeAfter']>()
  const startTimeNull = ref<FlowRunFilter['startTimeNull']>()
  const parentTaskRunIdOperator = ref<FlowRunFilter['parentTaskRunIdOperator']>()
  const parentTaskRunId = ref<FlowRunFilter['parentTaskRunId']>()
  const parentTaskRunIdNull = ref<FlowRunFilter['parentTaskRunIdNull']>()
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

export function useFlowRunFilterFromRoute(prefix?: string): UseFilter<FlowRunFilter> {
  const params = useRouteQueryParams(flowRunFilterSchema, {}, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter,
  }
}

export function useTaskRunFilter(): UseFilter<TaskRunFilter> {
  const operator = ref<Operation>()
  const id = ref<string | string[]>()
  const name = ref<string | string[]>()
  const nameLike = ref<string>()
  const tags = useTagFilter()
  const state = useStateFilter()
  const startTimeBefore = ref<Date>()
  const startTimeAfter = ref<Date>()
  const startTimeNull = ref<boolean>()
  const subFlowRunsExist = ref<boolean>()
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

export function useTaskRunFilterFromRoute(prefix?: string): UseFilter<TaskRunFilter> {
  const params = useRouteQueryParams(taskRunFilterSchema, {}, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter,
  }
}

export function useDeploymentFilter(): UseFilter<DeploymentFilter> {
  const operator = ref<Operation>()
  const id = ref<string | string[]>()
  const name = ref<string | string[]>()
  const nameLike = ref<string>()
  const isScheduleActive = ref<boolean>()
  const workQueueName = ref<string | string[]>()
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

export function useDeploymentFilterFromRoute(prefix?: string): UseFilter<DeploymentFilter> {
  const params = useRouteQueryParams(deploymentFilterSchema, {}, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter,
  }
}

export function useBlockTypeFilter(): UseFilter<BlockTypeFilter> {
  const nameLike = ref<string>()
  const slug = ref<string | string[]>()
  const filter = reactive({
    nameLike,
    slug,
  })

  return {
    nameLike,
    slug,
    filter,
  }
}

const blockTypeFilterSchema: RouteQueryParamsSchema<BlockTypeFilter> = {
  nameLike: StringRouteParam,
  slug: StringRouteParam,
}

export function useBlockTypeFilterFromRoute(prefix?: string): UseFilter<BlockTypeFilter> {
  const params = useRouteQueryParams(blockTypeFilterSchema, {}, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter,
  }
}

export function useBlockSchemaFilter(): UseFilter<BlockSchemaFilter> {
  const operator = ref<Operation>()
  const id = ref<string | string[]>()
  const blockTypeId = ref<string | string[]>()
  const blockCapability = ref<string | string[]>()
  const version = ref<string | string[]>()
  const filter = reactive({
    operator,
    id,
    blockTypeId,
    blockCapability,
    version,
  })

  return {
    operator,
    id,
    blockTypeId,
    blockCapability,
    version,
    filter,
  }
}

const blockSchemaFilterSchema: RouteQueryParamsSchema<BlockSchemaFilter> = {
  operator: OperatorRouteParam,
  id: StringRouteParam,
  blockTypeId: StringRouteParam,
  blockCapability: StringRouteParam,
  version: StringRouteParam,
}

export function useBlockSchemaFilterFromRoute(prefix?: string): UseFilter<BlockSchemaFilter> {
  const params = useRouteQueryParams(blockSchemaFilterSchema, {}, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter,
  }
}

export function useBlockDocumentFilter(): UseFilter<BlockDocumentFilter> {
  const operator = ref<Operation>()
  const id = ref<string | string[]>()
  const isAnonymous = ref<boolean>()
  const blockTypeId = ref<string | string[]>()
  const name = ref<string | string[]>()
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
  }
}

export function useUnionFilter<T extends UnionFilter>(): UseFilter<T> {
  const { filter: flowsFilter, ...flows } = useFlowFilter()
  const { filter: flowRunsFilter, ...flowRuns } = useFlowRunFilter()
  const { filter: taskRunsFilter, ...taskRuns } = useTaskRunFilter()
  const { filter: deploymentsFilter, ...deployments } = useDeploymentFilter()
  const sort = ref<T['sort']>()
  const offset = ref<number>()
  const limit = ref<number>()
  const filter = reactive({
    flows: flowsFilter,
    flowRuns: flowRunsFilter,
    taskRuns: taskRunsFilter,
    deployments: deploymentsFilter,
    sort,
    offset,
    limit,
  })

  return {
    flows,
    flowRuns,
    taskRuns,
    deployments,
    sort,
    offset,
    limit,
    filter,
  } as UseFilter<T>
}

export const useFlowsFilter = useUnionFilter<FlowsFilter>()
export const useFlowRunsFilter = useUnionFilter<FlowRunsFilter>()
export const useTaskRunsFilter = useUnionFilter<TaskRunsFilter>()
export const useDeploymentsFilter = useUnionFilter<DeploymentsFilter>()

const unionFilterSchema: Omit<RouteQueryParamsSchema<UnionFilter>, 'sort'> = {
  flows: flowFilterSchema,
  flowRuns: flowRunFilterSchema,
  taskRuns: taskRunFilterSchema,
  deployments: deploymentFilterSchema,
  offset: NumberRouteParam,
  limit: NumberRouteParam,
}

export function useUnionFilterFromRoute<T extends UnionFilterSort>(sort: RouteQueryParamsSchema<UnionFilter<T>>['sort'], defaultValue: UnionFilter<T>, prefix?: string): UseFilter<UnionFilter<T>> {
  const schema: RouteQueryParamsSchema<UnionFilter<T>> = {
    ...unionFilterSchema,
    sort: sort,
  }
  const params = useRouteQueryParams(schema, defaultValue, prefix)
  const filter = reactive(params)

  return {
    ...params,
    filter,
  } as UseFilter<UnionFilter<T>>
}

class FlowSortValuesSortParam extends RouteParam<FlowSortValues> {
  protected parse(value: LocationQueryValue): FlowSortValues {
    if (isFlowSortValue(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }
  protected format(value: FlowSortValues): LocationQueryValue {
    if (isFlowSortValue(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }
}

export function useFlowsFilterFromRoute(defaultValue: FlowsFilter = {}, prefix?: string): UseFilter<FlowsFilter> {
  return useUnionFilterFromRoute(FlowSortValuesSortParam, defaultValue, prefix)
}

class FlowRunSortValuesSortParam extends RouteParam<FlowRunSortValues> {
  protected parse(value: LocationQueryValue): FlowRunSortValues {
    if (isFlowRunSortValue(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }
  protected format(value: FlowRunSortValues): LocationQueryValue {
    if (isFlowRunSortValue(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }
}

export function useFlowRunsFilterFromRoute(defaultValue: FlowRunsFilter = {}, prefix?: string): UseFilter<FlowRunsFilter> {
  return useUnionFilterFromRoute(FlowRunSortValuesSortParam, defaultValue, prefix)
}

class TaskRunSortValuesSortParam extends RouteParam<TaskRunSortValues> {
  protected parse(value: LocationQueryValue): TaskRunSortValues {
    if (isTaskRunSortValue(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }
  protected format(value: TaskRunSortValues): LocationQueryValue {
    if (isTaskRunSortValue(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }
}

export function useTaskRunsFilterFromRoute(defaultValue: TaskRunsFilter = {}, prefix?: string): UseFilter<TaskRunsFilter> {
  return useUnionFilterFromRoute(TaskRunSortValuesSortParam, defaultValue, prefix)
}

class DeploymentSortValuesSortParam extends RouteParam<DeploymentSortValues> {
  protected parse(value: LocationQueryValue): DeploymentSortValues {
    if (isDeploymentSortValue(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }
  protected format(value: DeploymentSortValues): LocationQueryValue {
    if (isDeploymentSortValue(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }
}

export function useDeploymentsFilterFromRoute(defaultValue: DeploymentsFilter = {}, prefix?: string): UseFilter<DeploymentsFilter> {
  return useUnionFilterFromRoute(DeploymentSortValuesSortParam, defaultValue, prefix)
}
