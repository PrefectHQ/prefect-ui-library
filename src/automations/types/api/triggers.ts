import { isRecord } from '@/utilities/object'
import { createTuple } from '@/utilities/tuples'

export type AutomationTriggerEventResourceLabel =
 | 'prefect.resource.id'
 | 'prefect.resource.role'
 | 'prefect.resource.name'
 | 'prefect-cloud.incident.severity'

export type AutomationTriggerEventResource =
 | 'prefect.deployment'
 | 'prefect.flow-run'
 | 'prefect.flow'
 | 'prefect.tag'
 | 'prefect.work-pool'
 | 'prefect.work-queue'
 | 'prefect-cloud.incident'

export type AutomationTriggerEventResourceRole =
 | 'flow'
 | 'tag'
 | 'work-queue'
 | 'work-pool'

export type EventResourceValue = string | string[] | undefined

export type AutomationTriggerMatch = Partial<Record<AutomationTriggerEventResourceLabel, EventResourceValue>>

export const { values: automationTriggerEventPosture, isValue: isAutomationTriggerEventPosture } = createTuple([
  'Reactive',
  'Proactive',
])

export const DEFAULT_EVENT_TRIGGER_WITHIN = 0

export type AutomationTriggerEventPosture = typeof automationTriggerEventPosture[number]

export type AutomationTriggerEventResponse = {
  type: 'event',
  match?: AutomationTriggerMatch,
  match_related?: AutomationTriggerMatch,
  after?: string[],
  expect?: string[],
  for_each?: string[],
  posture: AutomationTriggerEventPosture,
  threshold: number,
  within?: number,
}

export function isAutomationTriggerEventResponse(value: unknown): value is AutomationTriggerEventResponse {
  return isRecord(value) && value.type === 'event' && isAutomationTriggerEventPosture(value.posture)
}

export type AutomationTriggerResponse = AutomationTriggerEventResponse