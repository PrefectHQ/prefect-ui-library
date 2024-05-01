import { AutomationTriggerEvent, isAutomationTriggerEventPosture } from '@/automations/types/automationTriggerEvent'
import { isRecord } from '@/utilities/object'

export function isAutomationTriggerEvent(value: unknown): value is AutomationTriggerEvent {
  return isRecord(value) && value.type === 'event' && isAutomationTriggerEventPosture(value.posture)
}

export type AutomationTrigger = AutomationTriggerEvent