/* eslint-disable max-classes-per-file */
import { BooleanRouteParam, InvalidRouteParamValue, ObjectRouteParam, ObjectRouteParamSchema, RouteParam, RouteParamClass, StringRouteParam, useRouteQueryParam } from '@prefecthq/vue-compositions'
import { Ref, ref, reactive, computed, watch } from 'vue'
import { LocationQueryValue, onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { BlockDocumentFilter, BlockSchemaFilter, BlockTypeFilter, DeploymentFilter, DeploymentsFilter, FlowFilter, FlowRunFilter, FlowRunsFilter, FlowsFilter, isOperation, Operation, StateFilter, TagFilter, TaskRunFilter, TaskRunsFilter, UnionFilter, UnionFilterSort } from '@/models/Filters'
import { deploymentSortValues, flowRunSortValues, flowSortValues, taskRunSortValues } from '@/types/SortOptionTypes'

// todo: useRouteQueryParam returns an empty string. Is that fine? Or do these methods need to return undefined same as the non route versions

type UseFilter<T extends Record<string, unknown>> = Required<{
  [Property in keyof T]: NonNullable<T[Property]> extends Record<string, unknown> ? UseFilter<NonNullable<T[Property]>> | undefined : Ref<T[Property]>
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

class TagFilterRouteParam extends ObjectRouteParam<TagFilter> {
  protected schema: ObjectRouteParamSchema<TagFilter> = {
    operator: OperatorRouteParam,
    name: StringRouteParam,
    isNull: BooleanRouteParam,
  }
}

export function useTagFilterFromRoute(prefix?: string): UseFilter<TagFilter> {
  const response = useTagFilter()

  const query = useRouteQueryParam(prefix, TagFilterRouteParam, {})

  return response
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

export function useStateFilterFromRoute(prefix?: string): UseFilter<StateFilter> {
  const response = useStateFilter()

  useRouteQueryParams(response.filter, {
    operator: 'operation',
    name: 'string',
    type: 'string',
  }, prefix)

  return response
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

export function useFlowFilterFromRoute(prefix?: string): UseFilter<FlowFilter> {
  const { useOperation, useAny, useLike } = useWithPrefix(prefix)
  const operator = useOperation('operator')
  const id = useAny('id')
  const name = useAny('name')
  const nameLike = useLike('nameLike')
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

export function useFlowRunFilterFromRoute(prefix?: string): UseFilter<FlowRunFilter> {
  const { useOperation, useAny, useBoolean, useDate, useLike, useStateFilter } = useWithPrefix(prefix)
  const operator = useOperation('operator')
  const id = useAny('id')
  const notId = useAny('notId')
  const name = useAny('name')
  const nameLike = useLike('nameLike')
  const tags = useTagFilterFromRoute('flow-run')
  const deploymentIdOperator = useOperation('deploymentIdOperator')
  const deploymentId = useAny('deploymentId')
  const deploymentIdNull = useBoolean('deploymentIdNull')
  const workQueueNameOperator = useOperation('workQueueNameOperator')
  const workQueueName = useAny('workQueueName')
  const workQueueNameIsNull = useBoolean('workQueueNameIsNull')
  const state = useStateFilter('state')
  const flowVersion = useAny('flowVersion')
  const expectedStartTimeBefore = useDate('expectedStartTimeBefore')
  const expectedStartTimeAfter = useDate('expectedStartTimeAfter')
  const nextExpectedStartTimeBefore = useDate('nextExpectedStartTimeBefore')
  const nextExpectedStartTimeAfter = useDate('nextExpectedStartTimeAfter')
  const startTimeBefore = useDate('startTimeBefore')
  const startTimeAfter = useDate('startTimeAfter')
  const startTimeNull = useBoolean('startTimeNull')
  const parentTaskRunIdOperator = useOperation('parentTaskRunIdOperator')
  const parentTaskRunId = useAny('parentTaskRunId')
  const parentTaskRunIdNull = useBoolean('parentTaskRunIdNull')
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

export function useTaskRunFilterFromRoute(prefix?: string): UseFilter<TaskRunFilter> {
  const { useOperation, useAny, useBoolean, useDate, useLike, useStateFilter, useTagFilter } = useWithPrefix(prefix)
  const operator = useOperation('operator')
  const id = useAny('id')
  const name = useAny('name')
  const nameLike = useLike('nameLike')
  const tags = useTagFilter('tags')
  const state = useStateFilter('state')
  const startTimeBefore = useDate('startTimeBefore')
  const startTimeAfter = useDate('startTimeAfter')
  const startTimeNull = useBoolean('startTimeNull')
  const subFlowRunsExist = useBoolean('subFlowRunsExist')
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

export function useDeploymentFilterFromRoute(prefix?: string): UseFilter<DeploymentFilter> {
  const { useOperation, useAny, useLike, useBoolean } = useWithPrefix(prefix)
  const operator = useOperation('operator')
  const id = useAny('id')
  const name = useAny('id')
  const nameLike = useLike('id')
  const isScheduleActive = useBoolean('isScheduleActive')
  const workQueueName = useAny('workQueueName')
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

export function useBlockTypeFilterFromRoute(prefix?: string): UseFilter<BlockTypeFilter> {
  const { useLike, useAny } = useWithPrefix(prefix)
  const nameLike = useLike('nameLike')
  const slug = useAny('slug')
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

export function useBlockSchemaFilterFromRoute(prefix?: string): UseFilter<BlockSchemaFilter> {
  const { useOperation, useAny } = useWithPrefix(prefix)
  const operator = useOperation('operator')
  const id = useAny('id')
  const blockTypeId = useAny('blockTypeId')
  const blockCapability = useAny('blockCapability')
  const version = useAny('version')
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

export function useBlockDocumentFilterFromRoute(prefix?: string): UseFilter<BlockDocumentFilter> {
  const { useOperation, useAny, useBoolean } = useWithPrefix(prefix)
  const operator = useOperation('operator')
  const id = useAny('id')
  const isAnonymous = useBoolean('isAnonymous')
  const blockTypeId = useAny('blockTypeId')
  const name = useAny('name')
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

export function useUnionFilter<T extends UnionFilter>(): UseFilter<T> {
  const flows = useFlowFilter()
  const flowRuns = useFlowRunFilter()
  const taskRuns = useTaskRunFilter()
  const deployments = useDeploymentFilter()
  const sort = ref<T['sort']>()
  const offset = ref<number>()
  const limit = ref<number>()
  const filter = reactive({
    flows: flows.filter,
    flowRuns: flowRuns.filter,
    taskRuns: taskRuns.filter,
    deployments: deployments.filter,
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

export function useUnionFilterFromRoute<T extends UnionFilter>(sorts: Readonly<NonNullable<T['sort']>[]>, prefix?: string): UseFilter<T> {
  const { useFlowFilter, useFlowRunFilter, useTaskRunFilter, useDeploymentFilter, useNumber, useSort } = useWithPrefix(prefix)
  const flows = useFlowFilter('flows')
  const flowRuns = useFlowRunFilter('flowRuns')
  const taskRuns = useTaskRunFilter('taskRuns')
  const deployments = useDeploymentFilter('deployments')
  const sort = useSort(sorts, 'sort')
  const offset = useNumber('offset')
  const limit = useNumber('limit')
  const filter = reactive({
    flows: flows.filter,
    flowRuns: flowRuns.filter,
    taskRuns: taskRuns.filter,
    deployments: deployments.filter,
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

export const useFlowsFilterFromRoute = (): UseFilter<FlowsFilter> => useUnionFilterFromRoute<FlowsFilter>(flowSortValues)
export const useFlowRunsFilterFromRoute = (): UseFilter<FlowRunsFilter> => useUnionFilterFromRoute<FlowRunsFilter>(flowRunSortValues)
export const useTaskRunsFilterFromRoute = (): UseFilter<TaskRunsFilter> => useUnionFilterFromRoute<TaskRunsFilter>(taskRunSortValues)
export const useDeploymentsFilterFromRoute = (): UseFilter<DeploymentsFilter> => useUnionFilterFromRoute<DeploymentsFilter>(deploymentSortValues)
