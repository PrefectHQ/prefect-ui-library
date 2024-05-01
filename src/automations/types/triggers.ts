import { AutomationTriggerEvent } from '@/automations/types/automationTriggerEvent'

export function isAutomationTriggerEvent(value: AutomationTrigger): value is AutomationTriggerEvent {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return value.type === 'event'
}

export type AutomationTrigger = AutomationTriggerEvent