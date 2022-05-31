export type FlowRunSortValues = 'NAME_DESC' | 'NAME_ASC' | 'EXPECTED_START_TIME_DESC' | 'EXPECTED_START_TIME_ASC' | 'NEXT_SCHEDULED_START_TIME_ASC'

export type FlowRunSortOptions = { label: string, value: FlowRunSortValues }[]

export type TaskRunSortValues = 'ID_DESC' | 'EXPECTED_START_TIME_ASC' | 'EXPECTED_START_TIME_DESC' | 'NEXT_SCHEDULED_START_TIME_ASC' | 'END_TIME_DESC'

export type TaskRunSortOptions = { label: string, value: TaskRunSortValues }[]

