import { isMatchResource, isForEachResource, isAfterResource, isExpectResource } from '@/automations/maps/utilities'
import { AutomationTriggerEventPosture, DEFAULT_EVENT_TRIGGER_THRESHOLD } from '@/automations/types/automationTriggerEvent'
import { isAutomationTriggerEvent } from '@/automations/types/triggers'
import { WorkPoolQueueStatus } from '@/models/WorkPoolQueue'
import { createTuple } from '@/utilities'

export const { values: workQueueStatusEvent, isValue: isWorkQueueStatusEvent } = createTuple(['prefect.work-queue.ready', 'prefect.work-queue.not-ready', 'prefect.work-queue.paused'])
export type WorkQueueStatusEvent = typeof workQueueStatusEvent[number]

export type WorkQueueStatusTrigger = {
  workPools: string[],
  workQueues: string[],
  status: WorkPoolQueueStatus,
  posture: AutomationTriggerEventPosture,
  time: number,
}

export function isWorkQueueStatusTrigger(trigger: unknown): boolean {
  return isAutomationTriggerEvent(trigger) &&
         isMatchResource(trigger, prefectResourceIds => prefectResourceIds.every(value => value.startsWith('prefect.work-queue'))) &&
         isForEachResource(trigger, 'prefect.resource.id') &&
         isAfterResource(trigger, triggerAfters => triggerAfters.every(after => isWorkQueueStatusEvent(after))) &&
         isExpectResource(trigger, triggerExpects => triggerExpects.every(expect => isWorkQueueStatusEvent(expect))) &&
         trigger.threshold === DEFAULT_EVENT_TRIGGER_THRESHOLD
}

