import { isMatchResource, isForEachResource, isAfterResource, isExpectResource } from '@/automations/maps/utilities'
import { AutomationTriggerEventPosture, DEFAULT_EVENT_TRIGGER_THRESHOLD } from '@/automations/types/automationTriggerEvent'
import { isAutomationTriggerEvent } from '@/automations/types/triggers'
import { WorkPoolStatus } from '@/models/WorkPoolStatus'
import { createTuple } from '@/utilities'

export const { values: workPoolStatusEvent, isValue: isWorkPoolStatusEvent } = createTuple(['prefect.work-pool.ready', 'prefect.work-pool.not-ready', 'prefect.work-pool.paused', 'prefect.work-pool.not_ready'])
export type WorkPoolStatusEvent = typeof workPoolStatusEvent[number]

export type WorkPoolStatusTrigger = {
  workPools: string[],
  posture: AutomationTriggerEventPosture,
  status: WorkPoolStatus | null,
  time: number,
}

export function isWorkPoolStatusTrigger(trigger: unknown): boolean {
  return isAutomationTriggerEvent(trigger) &&
         isMatchResource(trigger, prefectResourceIds => prefectResourceIds.every(value => value.startsWith('prefect.work-pool'))) &&
         isForEachResource(trigger, 'prefect.resource.id') &&
         isAfterResource(trigger, triggerAfters => triggerAfters.every(after => isWorkPoolStatusEvent(after))) &&
         isExpectResource(trigger, triggerExcepts => triggerExcepts.every(except => isWorkPoolStatusEvent(except))) &&
         trigger.threshold === DEFAULT_EVENT_TRIGGER_THRESHOLD
}
