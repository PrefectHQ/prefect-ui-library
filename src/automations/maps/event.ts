import { AutomationTriggerEvent } from '@/automations/types/automationTriggerEvent'
import { AutomationTrigger } from '@/automations/types/triggers'
import { WorkspaceEvent } from '@/models'
import { MapFunction } from '@/services/Mapper'
import { getPrefectResourceRole } from '@/utilities/events'

export const mapEventToAutomationTrigger: MapFunction<WorkspaceEvent, AutomationTrigger> = function(event) {
  const role = getPrefectResourceRole(event.event)

  switch (role) {
    case 'flow-run':
      return mapEventToFlowRunStateChangeTrigger(event)
    case 'work-queue':
      return mapEventToWorkQueueTrigger(event)
    default:
      return mapEventToCustomAutomationTrigger(event)
  }
}

function mapEventToFlowRunStateChangeTrigger(event: WorkspaceEvent): AutomationTrigger {
  const relatedFlow = event.getRelatedByRole('flow')

  return new AutomationTriggerEvent({
    'posture': 'Reactive',
    'match': {
      'prefect.resource.id': event.resourceId,
    },
    'matchRelated': {
      'prefect.resource.role': 'flow',
      'prefect.resource.id': relatedFlow?.['prefect.resource.id'],
    },
    'forEach': ['prefect.resource.id'],
    'expect': [event.event],
  })
}

function mapEventToWorkQueueTrigger(event: WorkspaceEvent): AutomationTrigger {
  const relatedWorkQueue = event.getRelatedByRole('work-queue')

  return new AutomationTriggerEvent({
    'posture': 'Reactive',
    'match': {
      'prefect.resource.id': event.resourceId,
    },
    'matchRelated': {
      'prefect.resource.role': 'flow',
      'prefect.resource.id': relatedWorkQueue?.['prefect.resource.id'],
    },
    'forEach': ['prefect.resource.id'],
    'expect': [event.event],
  })
}

function mapEventToCustomAutomationTrigger(event: WorkspaceEvent): AutomationTrigger {
  return new AutomationTriggerEvent({
    'posture': 'Reactive',
    'match': {
      'prefect.resource.id': event.resourceId,
    },
    'expect': [event.event],
  })
}