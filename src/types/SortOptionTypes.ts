const flowSortValues = ['CREATED_DESC', 'UPDATED_DESC', 'NAME_DESC', 'NAME_ASC'] as const
export type FlowSortValues = typeof flowSortValues[number]

export function isFlowSortValue(value: unknown): value is FlowSortValues {
  return flowSortValues.includes(value as FlowSortValues)
}

const flowRunSortValues = ['CREATED_DESC', 'NAME_DESC', 'NAME_ASC', 'EXPECTED_START_TIME_DESC', 'EXPECTED_START_TIME_ASC', 'NEXT_SCHEDULED_START_TIME_ASC'] as const
export type FlowRunSortValues = typeof flowRunSortValues[number]

export function isFlowRunSortValue(value: unknown): value is FlowRunSortValues {
  return flowRunSortValues.includes(value as FlowRunSortValues)
}

export type FlowRunSortOptions = { label: string, value: FlowRunSortValues }[]

const taskRunSortValues = ['ID_DESC', 'EXPECTED_START_TIME_ASC', 'EXPECTED_START_TIME_DESC', 'NEXT_SCHEDULED_START_TIME_ASC', 'END_TIME_DESC'] as const
export type TaskRunSortValues = typeof taskRunSortValues[number]

export function isTaskRunSortValue(value: unknown): value is TaskRunSortValues {
  return taskRunSortValues.includes(value as TaskRunSortValues)
}

export type TaskRunSortOptions = { label: string, value: TaskRunSortValues }[]

