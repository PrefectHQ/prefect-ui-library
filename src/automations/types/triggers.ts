import { isArray } from '@prefecthq/prefect-design'
import { AutomationTriggerCompound } from '@/automations/types/automationTriggerCompound'
import { AutomationTriggerEvent, isAutomationTriggerEventPosture } from '@/automations/types/automationTriggerEvent'
import { AutomationTriggerSequence } from '@/automations/types/automationTriggerSequence'
import { isRecord } from '@/utilities/object'

export function isAutomationTriggerEvent(value: unknown): value is AutomationTriggerEvent {
  return isRecord(value) && value.type === 'event' && isAutomationTriggerEventPosture(value.posture)
}

export function isAutomationTriggerCompound(value: unknown): value is AutomationTriggerCompound {
  return isRecord(value) && value.type === 'compound' && isArray(value.triggers) && value.triggers.every(isAutomationTrigger)
}

export function isAutomationTriggerSequence(value: unknown): value is AutomationTriggerSequence {
  return isRecord(value) && value.type === 'sequence' && isArray(value.triggers) && value.triggers.every(isAutomationTrigger)
}

export type AutomationTrigger = AutomationTriggerEvent | AutomationTriggerCompound | AutomationTriggerSequence

export function isAutomationTrigger(value: unknown): value is AutomationTrigger {
  return isAutomationTriggerEvent(value) || isAutomationTriggerCompound(value) || isAutomationTriggerSequence(value)
}