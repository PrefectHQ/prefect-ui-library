import { isAfterResource, isExpectResource, isForEachResource, isMatchResource } from '@/automations/maps/utilities'
import { AutomationTriggerEventPosture, DEFAULT_EVENT_TRIGGER_THRESHOLD } from '@/automations/types/automationTriggerEvent'
import { isAutomationTriggerEvent } from '@/automations/types/triggers'
import { DeploymentStatus } from '@/models/DeploymentStatus'
import { createTuple } from '@/utilities/tuples'

export const { values: deploymentStatusEvent, isValue: isDeploymentStatusEvent } = createTuple(['prefect.deployment.ready', 'prefect.deployment.not-ready'])
export type DeploymentStatusEvent = typeof deploymentStatusEvent[number]

export type DeploymentStatusTrigger = {
  deployments: string[],
  posture: AutomationTriggerEventPosture,
  status: DeploymentStatus,
  time: number,
}

/**
 * This is used to determine if an AutomationTrigger can be mapped into a DeploymentStatusTrigger
 */
export function isDeploymentStatusTrigger(trigger: unknown): boolean {
  return isAutomationTriggerEvent(trigger) &&
         isMatchResource(trigger, prefectResourceIds => prefectResourceIds.every(value => value.startsWith('prefect.deployment'))) &&
         isForEachResource(trigger, 'prefect.resource.id') &&
         isAfterResource(trigger, triggerAfters => triggerAfters.every(after => isDeploymentStatusEvent(after))) &&
         isExpectResource(trigger, triggerExcepts => triggerExcepts.every(except => isDeploymentStatusEvent(except))) &&
         trigger.threshold === DEFAULT_EVENT_TRIGGER_THRESHOLD
}