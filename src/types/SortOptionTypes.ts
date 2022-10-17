/* eslint-disable no-redeclare */
import { ref, Ref } from 'vue'
import { MaybeRef } from './reactivity'

const flowSortValues = ['CREATED_DESC', 'UPDATED_DESC', 'NAME_DESC', 'NAME_ASC'] as const
export type FlowSortValues = typeof flowSortValues[number]

export function isFlowSortValue(value: unknown): value is FlowSortValues
export function isFlowSortValue(value: Ref<unknown>): value is Ref<FlowSortValues>
export function isFlowSortValue(value: MaybeRef<unknown>): value is MaybeRef<FlowSortValues> {
  const valueRef = ref(value)

  return flowSortValues.includes(valueRef.value as FlowSortValues)
}

const deploymentSortValues = ['CREATED_DESC', 'UPDATED_DESC', 'NAME_DESC', 'NAME_ASC'] as const
export type DeploymentSortValues = typeof deploymentSortValues[number]

export function isDeploymentSortValue(value: unknown): value is DeploymentSortValues
export function isDeploymentSortValue(value: Ref<unknown>): value is Ref<DeploymentSortValues>
export function isDeploymentSortValue(value: MaybeRef<unknown>): value is MaybeRef<DeploymentSortValues> {
  const valueRef = ref(value)

  return deploymentSortValues.includes(valueRef.value as DeploymentSortValues)
}

const flowRunSortValues = ['CREATED_DESC', 'NAME_DESC', 'NAME_ASC', 'EXPECTED_START_TIME_DESC', 'EXPECTED_START_TIME_ASC', 'NEXT_SCHEDULED_START_TIME_ASC'] as const
export type FlowRunSortValues = typeof flowRunSortValues[number]

export function isFlowRunSortValue(value: unknown): value is FlowRunSortValues
export function isFlowRunSortValue(value: Ref<unknown>): value is Ref<FlowRunSortValues>
export function isFlowRunSortValue(value: MaybeRef<unknown>): value is MaybeRef<FlowRunSortValues> {
  const valueRef = ref(value)

  return flowRunSortValues.includes(valueRef.value as FlowRunSortValues)
}

export type FlowRunSortOptions = { label: string, value: FlowRunSortValues }[]

const taskRunSortValues = ['ID_DESC', 'EXPECTED_START_TIME_ASC', 'EXPECTED_START_TIME_DESC', 'NEXT_SCHEDULED_START_TIME_ASC', 'END_TIME_DESC'] as const
export type TaskRunSortValues = typeof taskRunSortValues[number]

export function isTaskRunSortValue(value: unknown): value is TaskRunSortValues
export function isTaskRunSortValue(value: Ref<unknown>): value is Ref<TaskRunSortValues>
export function isTaskRunSortValue(value: MaybeRef<unknown>): value is MaybeRef<TaskRunSortValues> {
  const valueRef = ref(value)

  return taskRunSortValues.includes(valueRef.value as TaskRunSortValues)
}

export type TaskRunSortOptions = { label: string, value: TaskRunSortValues }[]

