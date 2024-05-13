import { fromResourceId, toResourceId } from '@/automations/maps/utilities'
import { AutomationTriggerEvent } from '@/automations/types/automationTriggerEvent'
import { DeploymentStatusEvent, DeploymentStatusTrigger, isDeploymentStatusEvent } from '@/automations/types/deploymentStatusTrigger'
import { DeploymentStatus } from '@/models/DeploymentStatus'
import { MapFunction } from '@/schemas/mapper'

export const mapDeploymentStatusTriggerToAutomationTrigger: MapFunction<DeploymentStatusTrigger, AutomationTriggerEvent> = function(source) {
  if (source.posture === 'Reactive') {
    return mapReactiveDeploymentStatusTriggerToAutomationTrigger(source)
  }

  return mapProactiveDeploymentStatusTriggerToAutomationTrigger(source)
}

export const mapAutomationTriggerToDeploymentStatusTrigger: MapFunction<AutomationTriggerEvent, DeploymentStatusTrigger> = function(source) {
  if (source.posture === 'Reactive') {
    return mapReactiveAutomationTriggerToDeploymentStatusTrigger(source)
  }

  return mapProactiveAutomationTriggerToDeploymentStatusTrigger(source)
}

function mapReactiveDeploymentStatusTriggerToAutomationTrigger(source: DeploymentStatusTrigger): AutomationTriggerEvent {
  return new AutomationTriggerEvent({
    posture: 'Reactive',
    match: {
      'prefect.resource.id': toResourceId('prefect.deployment', source.deployments),
    },
    forEach: ['prefect.resource.id'],
    expect: [mapDeploymentStatusToEvent(source.status)],
  })
}

function mapProactiveDeploymentStatusTriggerToAutomationTrigger(source: DeploymentStatusTrigger): AutomationTriggerEvent {
  return new AutomationTriggerEvent({
    posture: 'Proactive',
    match: {
      'prefect.resource.id': toResourceId('prefect.deployment', source.deployments),
    },
    forEach: ['prefect.resource.id'],
    expect: [mapDeploymentStatusToEvent(oppositeStatus(source.status))],
    after: [mapDeploymentStatusToEvent(source.status)],
    within: source.time,
  })
}

function mapReactiveAutomationTriggerToDeploymentStatusTrigger(trigger: AutomationTriggerEvent): DeploymentStatusTrigger {
  return {
    deployments: fromResourceId('prefect.deployment', trigger.match['prefect.resource.id']),
    posture: 'Reactive',
    status: statusFromDeploymentStatusEvents(trigger.expect),
    time: trigger.within,
  }
}

function mapProactiveAutomationTriggerToDeploymentStatusTrigger(trigger: AutomationTriggerEvent): DeploymentStatusTrigger {
  return {
    deployments: fromResourceId('prefect.deployment', trigger.match['prefect.resource.id']),
    posture: 'Proactive',
    status: statusFromDeploymentStatusEvents(trigger.after),
    time: trigger.within,
  }

}

function oppositeStatus(status: DeploymentStatus): DeploymentStatus {
  return status === 'ready' ? 'not_ready' : 'ready'
}

function mapDeploymentStatusToEvent(status: DeploymentStatus): DeploymentStatusEvent {
  switch (status) {
    case 'ready':
      return 'prefect.deployment.ready'
    case 'not_ready':
      return 'prefect.deployment.not-ready'
    default:
      const exhaustiveCheck: never = status
      return `prefect.deployment.${exhaustiveCheck}`
  }
}

const statusEventToStatus: Record<DeploymentStatusEvent, DeploymentStatus> = {
  'prefect.deployment.ready': 'ready',
  'prefect.deployment.not-ready': 'not_ready',
}

function statusFromDeploymentStatusEvents(events: string[]): DeploymentStatus {
  for (const event of events) {
    if (isDeploymentStatusEvent(event)) {
      return statusEventToStatus[event]
    }
  }

  throw new Error(`Unknown deployment status events: ${events}`)
}