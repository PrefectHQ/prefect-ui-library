import { AutomationAction } from '@/automations/types/actions'
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

export type CreateAutomationQuery = CreateAutomationTriggerQuery & { actions?: AutomationAction[] }