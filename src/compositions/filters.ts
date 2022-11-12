import { useRouteQueryParam } from '@prefecthq/vue-compositions'
import { Ref, ref, reactive, computed } from 'vue'
import { BlockDocumentFilter, BlockSchemaFilter, BlockTypeFilter, DeploymentFilter, DeploymentsFilter, FlowFilter, FlowRunFilter, FlowRunsFilter, FlowsFilter, isOperation, Operation, StateFilter, TagFilter, TaskRunFilter, TaskRunsFilter, UnionFilter, UnionFilterSort } from '@/models/Filters'

// todo: useRouteQueryParam returns an empty string. Is that fine? Or do these methods need to return undefined same as the non route versions

type UseFilter<T extends Record<string, unknown>> = {
  [Property in keyof T]: NonNullable<T[Property]> extends Record<string, unknown> ? UseFilter<NonNullable<T[Property]>> | undefined : Ref<T[Property]>
} & { filter: T }

function withPrefix(prefix: string | undefined, value: string): string {
  if (prefix) {
    return `${prefix}.${value}`
  }

  return value
}

function withPrefixFactory(prefix?: string): (value: string) => string {
  return value => withPrefix(prefix, value)
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function useWithPrefix(prefix?: string) {
  const prefixed = withPrefixFactory(prefix)

  return {
    useBoolean: (param: string, defaultValue?: boolean) => useBooleanQueryParam(prefixed(param), defaultValue),
    useNumber: (param: string, defaultValue?: number) => useNumberQueryParam(prefixed(param), defaultValue),
    useOperation: (param: string, defaultValue?: Operation) => useOperationQueryParam(prefixed(param), defaultValue),
    useDate: (param: string, defaultValue?: Date) => useDateQueryParam(prefixed(param), defaultValue),
    useAny: (param: string, defaultValue: string | string[] = '') => useRouteQueryParam(prefixed(param), defaultValue),
    useLike: (param: string, defaultValue: string = '') => useRouteQueryParam(prefixed(param), defaultValue),
    useStateFilter: (prefix: string) => useStateFilterFromRoute(prefixed(prefix)),
    useTagFilter: (prefix: string) => useTagFilterFromRoute(prefixed(prefix)),
    useFlowFilter: (prefix: string) => useFlowFilterFromRoute(prefixed(prefix)),
    useFlowRunFilter: (prefix: string) => useFlowRunFilterFromRoute(prefixed(prefix)),
    useTaskRunFilter: (prefix: string) => useTaskRunFilterFromRoute(prefixed(prefix)),
    useDeploymentFilter: (prefix: string) => useDeploymentFilterFromRoute(prefixed(prefix)),
  }
}

function useBooleanQueryParam(param: string, defaultValue: boolean = false): Ref<boolean> {
  const valueRef = useRouteQueryParam(param, `${defaultValue}`)

  return computed({
    get() {
      return valueRef.value === 'true'
    },
    set(value: boolean) {
      valueRef.value = `${value}`
    },
  })
}

function useNumberQueryParam(param: string, defaultValue?: number): Ref<number | undefined> {
  const defaultValueString = defaultValue ? `${defaultValue}` : ''
  const valueRef = useRouteQueryParam(param, defaultValueString)

  return computed({
    get() {
      const int = parseInt(valueRef.value)

      if (isNaN(int)) {
        return undefined
      }

      return int
    },
    set(value: number | undefined) {
      valueRef.value = `${value}`
    },
  })
}

function useOperationQueryParam(param: string, defaultValue: Operation = 'and'): Ref<Operation> {
  const valueRef = useRouteQueryParam(param, defaultValue)

  return computed({
    get() {
      if (isOperation(valueRef.value)) {
        return valueRef.value
      }

      return defaultValue
    },
    set(value: Operation) {
      valueRef.value = value
    },
  })
}

function useDateQueryParam(param: string, defaultValue?: Date): Ref<Date | undefined> {
  const defaultValueString = defaultValue?.toISOString() ?? ''
  const valueRef = useRouteQueryParam(param, defaultValueString)

  return computed<Date | undefined>({
    get() {
      // todo: parse the valueRef to a date
      return defaultValue
    },
    set(value: Date | undefined) {
      valueRef.value = value?.toISOString() ?? ''
    },
  })

}

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

export function useTagFilterFromRoute(prefix?: string): UseFilter<TagFilter> {
  const { useBoolean, useOperation, useAny } = useWithPrefix(prefix)
  const operator = useOperation('operator')
  const name = useAny('name')
  const isNull = useBoolean('isNull')
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
  const { useOperation, useAny } = useWithPrefix(prefix)
  const operator = useOperation('operator')
  const name = useAny('name')
  const type = useAny('type')
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

export function useUnionFilterFromRoute<T extends UnionFilter>(prefix?: string): UseFilter<T> {
  const { useFlowFilter, useFlowRunFilter, useTaskRunFilter, useDeploymentFilter, useNumber } = useWithPrefix(prefix)
  const flows = useFlowFilter('flows')
  const flowRuns = useFlowRunFilter('flowRuns')
  const taskRuns = useTaskRunFilter('taskRuns')
  const deployments = useDeploymentFilter('deployments')
  // todo: type safe unions?
  const sort = ref<T['sort']>()
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

export const useFlowsFilterFromRoute = useUnionFilterFromRoute<FlowsFilter>()
export const useFlowRunsFilterFromRoute = useUnionFilterFromRoute<FlowRunsFilter>()
export const useTaskRunsFilterFromRoute = useUnionFilterFromRoute<TaskRunsFilter>()
export const useDeploymentsFilterFromRoute = useUnionFilterFromRoute<DeploymentsFilter>()
