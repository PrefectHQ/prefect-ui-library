import { Ref, toValue } from 'vue'
import { MaybeRef } from '@/types/reactivity'

export const artifactSortValues = ['CREATED_DESC', 'UPDATED_DESC', 'KEY_DESC', 'KEY_ASC', 'ID_ASC', 'ID_DESC'] as const
export type ArtifactSortValues = typeof artifactSortValues[number]
export const defaultArtifactSort: FlowSortValues = 'CREATED_DESC'

export function isArtifactSortValue(value: unknown): value is ArtifactSortValues
export function isArtifactSortValue(value: Ref<unknown>): value is Ref<ArtifactSortValues>
export function isArtifactSortValue(value: MaybeRef<unknown>): value is MaybeRef<ArtifactSortValues> {
  return artifactSortValues.includes(toValue(value) as ArtifactSortValues)
}

export const artifactSortOptions = [
  { label: 'Created', value: 'CREATED_DESC' },
  { label: 'Updated', value: 'UPDATED_DESC' },
  { label: 'A to Z', value: 'KEY_ASC' },
  { label: 'Z to A', value: 'KEY_DESC' },
]

export const variableSortValues = ['CREATED_DESC', 'UPDATED_DESC', 'NAME_DESC', 'NAME_ASC'] as const
export type VariableSortValues = typeof variableSortValues[number]
export const defaultVariableSort: VariableSortValues = 'NAME_ASC'

export function isVariableSortValue(value: unknown): value is VariableSortValues
export function isVariableSortValue(value: Ref<unknown>): value is Ref<VariableSortValues>
export function isVariableSortValue(value: MaybeRef<unknown>): value is MaybeRef<VariableSortValues> {
  return variableSortValues.includes(toValue(value) as VariableSortValues)
}

export const variableSortOptions = [
  { label: 'Created', value: 'CREATED_DESC' },
  { label: 'Updated', value: 'UPDATED_DESC' },
  { label: 'A to Z', value: 'NAME_ASC' },
  { label: 'Z to A', value: 'NAME_DESC' },
]

export const flowSortValues = ['CREATED_DESC', 'UPDATED_DESC', 'NAME_DESC', 'NAME_ASC'] as const
export type FlowSortValues = typeof flowSortValues[number]
export const defaultFlowSort: FlowSortValues = 'NAME_ASC'

export function isFlowSortValue(value: unknown): value is FlowSortValues
export function isFlowSortValue(value: Ref<unknown>): value is Ref<FlowSortValues>
export function isFlowSortValue(value: MaybeRef<unknown>): value is MaybeRef<FlowSortValues> {
  return flowSortValues.includes(toValue(value) as FlowSortValues)
}

export const flowSortOptions = [
  { label: 'Created', value: 'CREATED_DESC' },
  { label: 'A to Z', value: 'NAME_ASC' },
  { label: 'Z to A', value: 'NAME_DESC' },
]

export const deploymentSortValues = ['CREATED_DESC', 'UPDATED_DESC', 'NAME_DESC', 'NAME_ASC'] as const
export type DeploymentSortValues = typeof deploymentSortValues[number]
export const defaultDeploymentSort: DeploymentSortValues = 'NAME_ASC'

export function isDeploymentSortValue(value: unknown): value is DeploymentSortValues
export function isDeploymentSortValue(value: Ref<unknown>): value is Ref<DeploymentSortValues>
export function isDeploymentSortValue(value: MaybeRef<unknown>): value is MaybeRef<DeploymentSortValues> {
  return deploymentSortValues.includes(toValue(value) as DeploymentSortValues)
}

export const deploymentSortOptions = [
  { label: 'Created', value: 'CREATED_DESC' },
  { label: 'A to Z', value: 'NAME_ASC' },
  { label: 'Z to A', value: 'NAME_DESC' },
]

export const flowRunSortValues = ['ID_DESC', 'END_TIME_DESC', 'CREATED_DESC', 'NAME_DESC', 'NAME_ASC', 'EXPECTED_START_TIME_DESC', 'EXPECTED_START_TIME_ASC', 'NEXT_SCHEDULED_START_TIME_ASC', 'START_TIME_DESC', 'START_TIME_ASC'] as const
export type FlowRunSortValues = typeof flowRunSortValues[number]
export const defaultFlowRunSort: FlowRunSortValues = 'START_TIME_DESC'

export function isFlowRunSortValue(value: unknown): value is FlowRunSortValues
export function isFlowRunSortValue(value: Ref<unknown>): value is Ref<FlowRunSortValues>
export function isFlowRunSortValue(value: MaybeRef<unknown>): value is MaybeRef<FlowRunSortValues> {
  return flowRunSortValues.includes(toValue(value) as FlowRunSortValues)
}

export type FlowRunSortOptions = { label: string, value: FlowRunSortValues }[]

export const taskRunSortValues = ['ID_DESC', 'EXPECTED_START_TIME_ASC', 'EXPECTED_START_TIME_DESC', 'NAME_DESC', 'NAME_ASC', 'NEXT_SCHEDULED_START_TIME_ASC', 'END_TIME_DESC'] as const
export type TaskRunSortValues = typeof taskRunSortValues[number]
export const defaultTaskRunSort: TaskRunSortValues = 'EXPECTED_START_TIME_DESC'

export function isTaskRunSortValue(value: unknown): value is TaskRunSortValues
export function isTaskRunSortValue(value: Ref<unknown>): value is Ref<TaskRunSortValues>
export function isTaskRunSortValue(value: MaybeRef<unknown>): value is MaybeRef<TaskRunSortValues> {
  return taskRunSortValues.includes(toValue(value) as TaskRunSortValues)
}

export type TaskRunSortOptions = { label: string, value: TaskRunSortValues }[]

const logSortValues = ['TIMESTAMP_ASC', 'TIMESTAMP_DESC', 'LEVEL_ASC', 'LEVEL_DESC', 'FLOW_RUN_ID_ASC', 'FLOW_RUN_ID_DESC', 'TASK_RUN_ID_ASC', 'TASK_RUN_ID_DESC']
export type LogSortValues = typeof logSortValues[number]
export const defaultLogSort: LogSortValues = 'TIMESTAMP_ASC'

export function isLogSortValue(value: unknown): value is LogSortValues
export function isLogSortValue(value: Ref<unknown>): value is Ref<LogSortValues>
export function isLogSortValue(value: MaybeRef<unknown>): value is MaybeRef<LogSortValues> {
  return logSortValues.includes(toValue(value) as LogSortValues)
}

export type LogSortOptions = { label: string, value: LogSortValues }[]

const blockDocumentSortValues = ['NAME_DESC', 'NAME_ASC', 'BLOCK_TYPE_AND_NAME_ASC'] as const
export type BlockDocumentSortValues = typeof blockDocumentSortValues[number]
export const defaultBlockDocumentsSort: BlockDocumentSortValues = 'BLOCK_TYPE_AND_NAME_ASC'

export function isBlockDocumentSortValue(value: unknown): value is BlockDocumentSortValues
export function isBlockDocumentSortValue(value: Ref<unknown>): value is Ref<BlockDocumentSortValues>
export function isBlockDocumentSortValue(value: MaybeRef<unknown>): value is MaybeRef<BlockDocumentSortValues> {
  return blockDocumentSortValues.includes(toValue(value) as BlockDocumentSortValues)
}