import { AutomationTriggerEvent } from '@/automations/types/automationTriggerEvent'
import { DeploymentStatusTrigger } from '@/automations/types/deploymentStatusTrigger'
import { FlowRunStateTrigger } from '@/automations/types/flowRunStateTrigger'
import { AutomationTrigger } from '@/automations/types/triggers'
import { AutomationTriggerTemplate } from '@/automations/types/triggerTemplates'
import { WorkPoolStatusTrigger } from '@/automations/types/workPoolStatusTrigger'
import { WorkQueueStatusTrigger } from '@/automations/types/workQueueStatusTrigger'
import { mapper } from '@/services'

export function getDefaultAutomationTriggerValue(template: AutomationTriggerTemplate): AutomationTrigger {
  return defaultAutomationTriggerValues[template]
}

const defaultAutomationTriggerValues = {
  'deployment-status': mapper.map('DeploymentStatusTrigger', {
    deployments: [],
    posture: 'Reactive',
    status: 'not_ready',
    time: 30,
  } satisfies DeploymentStatusTrigger, 'AutomationTrigger'),

  'flow-run-state': mapper.map('FlowRunStateTrigger', {
    posture: 'Reactive',
    flowIds: [],
    tags: [],
    states: [],
    time: 30,
  } satisfies FlowRunStateTrigger, 'AutomationTrigger'),

  'work-pool-status': mapper.map('WorkPoolStatusTrigger', {
    workPools: [],
    posture: 'Reactive',
    status: 'not_ready',
    time: 30,
  } satisfies WorkPoolStatusTrigger, 'AutomationTrigger'),

  'work-queue-status': mapper.map('WorkQueueStatusTrigger', {
    workPools: [],
    workQueues: [],
    status: 'not_ready',
    posture: 'Reactive',
    time: 30,
  } satisfies WorkQueueStatusTrigger, 'AutomationTrigger'),

  'custom': new AutomationTriggerEvent({
    posture: 'Reactive',
    match: {
      'prefect.resource.id': ['prefect.flow-run.*'],
    },
    forEach: ['prefect.resource.id'],
    expect: ['prefect.flow-run.Failed'],
    threshold: 5,
    within: 60,
  }),

} satisfies Record<AutomationTriggerTemplate | 'custom', AutomationTrigger>
