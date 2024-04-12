import { isArray } from '@prefecthq/prefect-design'
import { AutomationAction, isAutomationAction } from '@/automations/types/actions'
import { isRecord } from '@/utilities/object'

export type CreateEventAutomationQuery = {
  from: 'event',
  event: { id: string, occurred: Date },
}

export function isCreateEventAutomationQuery(value: unknown): value is CreateEventAutomationQuery {
  return isRecord(value) && 'from' in value && value.from === 'event'
}

export type CreateFlowAutomationQuery = {
  from: 'flow',
  flowId: string,
}

export function isCreateFlowAutomationQuery(value: unknown): value is CreateFlowAutomationQuery {
  return isRecord(value) && 'from' in value && value.from === 'flow'
}

export type CreateWorkPoolQueueAutomationQuery = {
  from: 'workPoolQueue',
  workPoolQueueId: string,
}

export function isCreateWorkPoolQueueAutomationQuery(value: unknown): value is CreateWorkPoolQueueAutomationQuery {
  return isRecord(value) && 'from' in value && value.from === 'workPoolQueue'
}

export type CreateAutomationTriggerQuery =
  | CreateEventAutomationQuery
  | CreateFlowAutomationQuery
  | CreateWorkPoolQueueAutomationQuery

export function isCreateAutomationTriggerQuery(value: unknown): value is CreateAutomationTriggerQuery {
  return isCreateEventAutomationQuery(value) || isCreateFlowAutomationQuery(value) || isCreateWorkPoolQueueAutomationQuery(value)
}

export type CreateAutomationActionQuery = { actions: AutomationAction[] }

export function isCreateAutomationActionQuery(value: unknown): value is CreateAutomationActionQuery {
  return isRecord(value) && 'actions' in value && isArray(value.actions) && value.actions.every(isAutomationAction)
}

export type CreateAutomationQuery =
  | CreateAutomationTriggerQuery
  | CreateAutomationActionQuery
  | CreateAutomationTriggerQuery & CreateAutomationActionQuery