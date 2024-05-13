import { isDeploymentStatusTrigger } from '@/automations/types/deploymentStatusTrigger'
import { isFlowRunStateTrigger } from '@/automations/types/flowRunStateTrigger'
import { AutomationTrigger } from '@/automations/types/triggers'
import { isWorkPoolStatusTrigger } from '@/automations/types/workPoolStatusTrigger'
import { isWorkQueueStatusTrigger } from '@/automations/types/workQueueStatusTrigger'
import { createTuple } from '@/utilities/tuples'

export const { values: automationTriggerTemplates, isValue: isAutomationTriggerTemplate } = createTuple([
  'deployment-status',
  'flow-run-state',
  'work-pool-status',
  'work-queue-status',
  'custom',
])

export type AutomationTriggerTemplate = typeof automationTriggerTemplates[number]

const automationTriggerTypeLabel = {
  'deployment-status': 'Deployment status',
  'flow-run-state': 'Flow run state',
  'work-pool-status': 'Work pool status',
  'work-queue-status': 'Work queue status',
  'custom': 'Custom',
} as const satisfies Record<AutomationTriggerTemplate, string>

export function getAutomationTriggerTemplateLabel(template: AutomationTriggerTemplate): string {
  return automationTriggerTypeLabel[template]
}

type AutomationTriggerTypeCheck = (trigger: unknown) => boolean

export const automationTriggerTemplateChecks = {
  'deployment-status': isDeploymentStatusTrigger,
  'flow-run-state': isFlowRunStateTrigger,
  'work-pool-status': isWorkPoolStatusTrigger,
  'work-queue-status': isWorkQueueStatusTrigger,
} as const satisfies Record<Exclude<AutomationTriggerTemplate, 'custom'>, AutomationTriggerTypeCheck>

export function getAutomationTriggerTemplate(trigger: AutomationTrigger): AutomationTriggerTemplate {
  for (const [type, guard] of Object.entries(automationTriggerTemplateChecks)) {
    if (guard(trigger) && isAutomationTriggerTemplate(type)) {
      return type
    }
  }

  return 'custom'
}