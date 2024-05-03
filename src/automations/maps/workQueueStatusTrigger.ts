import { toResourceId, toMatchRelatedId, fromResourceId } from '@/automations/maps/utilities'
import { AutomationTriggerEvent } from '@/automations/types'
import { WorkQueueStatusEvent, WorkQueueStatusTrigger, isWorkQueueStatusEvent } from '@/automations/types/workQueueStatusTrigger'
import { WorkPoolQueueStatus } from '@/models'
import { MapFunction } from '@/services'

export const mapWorkQueueStatusTriggerToAutomationTrigger: MapFunction<WorkQueueStatusTrigger, AutomationTriggerEvent> = function(source) {
  if (source.posture === 'Reactive') {
    return mapReactiveWorkQueueStatusTriggerToAutomationTrigger(source)
  }

  return mapProactiveWorkQueueStatusTriggerToAutomationTrigger(source)
}

function mapReactiveWorkQueueStatusTriggerToAutomationTrigger(source: WorkQueueStatusTrigger): AutomationTriggerEvent {
  return new AutomationTriggerEvent({
    posture: 'Reactive',
    match: {
      'prefect.resource.id': toResourceId('prefect.work-queue', source.workQueues),
    },
    matchRelated: {
      ...toMatchRelatedId('work-pool', source.workPools),
    },
    forEach: ['prefect.resource.id'],
    expect: [mapWorkQueueStatusToEvent(source.status)],
  })
}

function mapProactiveWorkQueueStatusTriggerToAutomationTrigger(source: WorkQueueStatusTrigger): AutomationTriggerEvent {
  return new AutomationTriggerEvent({
    posture: 'Proactive',
    match: {
      'prefect.resource.id': toResourceId('prefect.work-queue', source.workQueues),
    },
    matchRelated: {
      ...toMatchRelatedId('work-pool', source.workPools),
    },
    forEach: ['prefect.resource.id'],
    expect: anyStatusExcept(source.status).map(mapWorkQueueStatusToEvent),
    after: [mapWorkQueueStatusToEvent(source.status)],
    within: source.time,
  })
}

function anyStatusExcept(status: WorkPoolQueueStatus): WorkPoolQueueStatus[] {
  return (['ready', 'not_ready', 'paused'] as const).filter(_status => _status !== status)
}

export const mapAutomationTriggerToWorkQueueStatusTrigger: MapFunction<AutomationTriggerEvent, WorkQueueStatusTrigger> = function(source) {
  if (source.posture === 'Reactive') {
    return mapReactiveAutomationTriggerToWorkQueueStatusTrigger(source)
  }

  return mapProactiveAutomationTriggerToWorkQueueStatusTrigger(source)
}

function mapReactiveAutomationTriggerToWorkQueueStatusTrigger(trigger: AutomationTriggerEvent): WorkQueueStatusTrigger {
  return {
    workPools: fromResourceId('prefect.work-pool', trigger.matchRelated['prefect.resource.id']),
    workQueues: fromResourceId('prefect.work-queue', trigger.match['prefect.resource.id']),
    status: statusFromAutomationTriggerEvent(trigger),
    posture: 'Reactive',
    time: trigger.within,
  }
}

function mapProactiveAutomationTriggerToWorkQueueStatusTrigger(trigger: AutomationTriggerEvent): WorkQueueStatusTrigger {
  return {
    workPools: fromResourceId('prefect.work-pool', trigger.matchRelated['prefect.resource.id']),
    workQueues: fromResourceId('prefect.work-queue', trigger.match['prefect.resource.id']),
    status: statusFromAutomationTriggerEvent(trigger),
    posture: 'Proactive',
    time: trigger.within,
  }
}

const statusEventToStatus: Record<WorkQueueStatusEvent, WorkPoolQueueStatus> = {
  'prefect.work-queue.ready': 'ready',
  'prefect.work-queue.not-ready': 'not_ready',
  'prefect.work-queue.paused': 'paused',
}

function statusFromAutomationTriggerEvent(trigger: AutomationTriggerEvent): WorkPoolQueueStatus {
  const statusEvents = trigger.posture === 'Reactive' ? trigger.expect : trigger.after

  for (const statusEvent of statusEvents) {
    if (isWorkQueueStatusEvent(statusEvent)) {
      return statusEventToStatus[statusEvent]
    }
  }

  throw new Error(`Unknown work queue status events: ${statusEvents}`)
}

function mapWorkQueueStatusToEvent(status: WorkPoolQueueStatus): WorkQueueStatusEvent {
  switch (status) {
    case 'not_ready':
      return 'prefect.work-queue.not-ready'
    case 'ready':
    case 'paused':
      return `prefect.work-queue.${status}`
    default:
      const exhaustiveCheck: never = status
      return `prefect.work-queue.${exhaustiveCheck}`
  }
}