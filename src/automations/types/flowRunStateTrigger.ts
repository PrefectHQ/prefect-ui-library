import { AutomationTriggerEventPosture } from '@/automations/types/automationTriggerEvent'

export type FlowRunStateTrigger = {
  flowIds: string[],
  tags: string[],
  posture: AutomationTriggerEventPosture,
  states: string[],
  time: number,
}
