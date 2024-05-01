import { createTuple } from '@/utilities/tuples'

export type EventResourceLabel =
 | 'prefect.resource.id'
 | 'prefect.resource.role'
 | 'prefect.resource.name'
 | 'prefect-cloud.incident.severity'

export type EventResource =
 | 'prefect.deployment'
 | 'prefect.flow-run'
 | 'prefect.flow'
 | 'prefect.tag'
 | 'prefect.work-pool'
 | 'prefect.work-queue'
 | 'prefect-cloud.incident'

export type EventResourceRole =
 | 'flow'
 | 'tag'
 | 'work-queue'
 | 'work-pool'

export type EventResourceValue = string | string[] | undefined

export type AutomationTriggerMatch = Partial<Record<EventResourceLabel, EventResourceValue>>

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

export function isAutomationTriggerEventResponse(value: AutomationTriggerResponse): value is AutomationTriggerEventResponse {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return value.type === 'event'
}

export type AutomationTriggerResponse = AutomationTriggerEventResponse