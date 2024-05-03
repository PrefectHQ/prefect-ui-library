import { createTuple } from '@/utilities/tuples'

export const { values: automationTriggerEventTemplates, isValue: isAutomationTriggerEventTemplate } = createTuple([
  'deployment-status',
  'flow-run-state',
  'work-pool-status',
  'work-queue-status',
  'custom',
])

export type AutomationTriggerEventTemplate = typeof automationTriggerEventTemplates[number]