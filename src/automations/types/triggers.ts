import { AutomationTriggerEvent, isAutomationTriggerEventPosture } from '@/automations/types/automationTriggerEvent'
import { isRecord } from '@/utilities/object'
import { createTuple } from '@/utilities/tuples'

export const { values: automationTriggerTypes, isValue: isAutomationTriggerType } = createTuple([
  'deployment-status',
  'flow-run-state',
  'work-pool-status',
  'work-queue-status',
  'custom',
])

export function isAutomationTriggerEvent(value: unknown): value is AutomationTriggerEvent {
  return isRecord(value) && value.type === 'event' && isAutomationTriggerEventPosture(value.posture)
}

export type AutomationTrigger = AutomationTriggerEvent