import { createTuple } from '@/utilities/tuples'

export const { values: automationTriggerTemplates, isValue: isAutomationTriggerTemplate } = createTuple([
  'deployment-status',
  'flow-run-state',
  'work-pool-status',
  'work-queue-status',
  'custom',
])

export type AutomationTriggerTemplate = typeof automationTriggerTemplates[number]