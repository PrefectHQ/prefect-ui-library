import { Require } from '@/types/utilities'
import { createTuple, isNullish, isRecord, isString } from '@/utilities'

export const { values: automationActionTypes, isValue: isAutomationActionType } = createTuple([
  // 'cancel-flow-run',
  'pause-deployment',
  'resume-deployment',
  // 'pause-work-queue',
  // 'resume-work-queue',
  // 'run-deployment',
  // 'send-notification',
  // 'suspend-flow-run',
  // 'pause-automation',
  // 'resume-automation',
  // 'pause-work-pool',
  // 'resume-work-pool',
])

export type AutomationActionType = typeof automationActionTypes[number]

export const automationActionTypeLabels = {
  'pause-deployment': 'Pause a deployment',
  'resume-deployment': 'Resume a deployment',
} as const satisfies Record<AutomationActionType, string>

/**
 * Utility type for creating individual automation action types.
 * Enforces `type` is of type `AutomationActionType`.
 */
export type AutomationActionWithType<
  TType extends AutomationActionType,
  TRest extends Record<string, unknown> = Record<never, never>
> = { type: TType } & TRest

function isAutomationActionTypeRecord<T extends AutomationActionType>(value: unknown, type: T): value is ({ type: T } & Record<string, unknown>) {
  return isRecord(value) && 'type' in value && value.type === type
}

// type AutomationActionRunDeployment = AutomationActionWithType<'run-deployment', {
//   deploymentId?: string | null,
//   parameters: SchemaValues | null,
//   jobVariables?: Record<string, unknown>,
// }>

// function isAutomationActionRunDeployment(value: unknown): value is AutomationActionRunDeployment {
//   if (!isAutomationActionTypeRecord(value, 'run-deployment')) {
//     return false
//   }

//   const isValidDeploymentId = isString(value.deploymentId) || isNullish(value.deploymentId)
//   const isValidParameters = isRecord(value.parameters) || value.parameters === null

//   return isValidDeploymentId && isValidParameters
// }

export type AutomationActionPauseDeployment = AutomationActionWithType<'pause-deployment', {
  deploymentId?: string | null,
}>

export function isAutomationActionPauseDeployment(value: unknown): value is AutomationActionPauseDeployment {
  if (!isAutomationActionTypeRecord(value, 'pause-deployment')) {
    return false
  }

  const isValidDeploymentId = isString(value.deploymentId) || isNullish(value.deploymentId)

  return isValidDeploymentId
}

export type AutomationActionResumeDeployment = AutomationActionWithType<'resume-deployment', {
  deploymentId?: string | null,
}>

export function isAutomationActionResumeDeployment(value: unknown): value is AutomationActionResumeDeployment {
  if (!isAutomationActionTypeRecord(value, 'resume-deployment')) {
    return false
  }

  const isValidDeploymentId = isString(value.deploymentId) || isNullish(value.deploymentId)

  return isValidDeploymentId
}


// type AutomationActionCancelFlowRun = AutomationActionWithType<'cancel-flow-run'>

// function isAutomationActionCancelFlowRun(value: unknown): value is AutomationActionCancelFlowRun {
//   return isAutomationActionTypeRecord(value, 'cancel-flow-run')
// }

// type AutomationActionPauseFlowRun = AutomationActionWithType<'suspend-flow-run'>

// function isAutomationActionPauseFlowRun(value: unknown): value is AutomationActionPauseFlowRun {
//   return isAutomationActionTypeRecord(value, 'suspend-flow-run')
// }

// type AutomationActionSendNotification = AutomationActionWithType<'send-notification', {
//   blockDocumentId: string,
//   subject: string,
//   body: string,
// }>

// function isAutomationActionSendNotification(value: unknown): value is AutomationActionSendNotification {
//   if (!isAutomationActionTypeRecord(value, 'send-notification')) {
//     return false
//   }

//   const isValidBlockDocumentId = isString(value.blockDocumentId) || isNullish(value.blockDocumentId)
//   const isValidSubject = isString(value.subject)
//   const isValidBody = isString(value.body)

//   return isValidBlockDocumentId && isValidSubject && isValidBody
// }

// type AutomationActionPauseWorkQueue = AutomationActionWithType<'pause-work-queue', {
//   workQueueId?: string | null,
// }>

// function isAutomationActionPauseWorkQueue(value: unknown): value is AutomationActionPauseWorkQueue {
//   if (!isAutomationActionTypeRecord(value, 'pause-work-queue')) {
//     return false
//   }

//   const isValidWorkQueueId = isString(value.workQueueId) || isNullish(value.workQueueId)

//   return isValidWorkQueueId
// }

// type AutomationActionResumeWorkQueue = AutomationActionWithType<'resume-work-queue', {
//   workQueueId?: string | null,
// }>

// function isAutomationActionResumeWorkQueue(value: unknown): value is AutomationActionResumeWorkQueue {
//   if (!isAutomationActionTypeRecord(value, 'resume-work-queue')) {
//     return false
//   }

//   const isValidWorkQueueId = isString(value.workQueueId) || isNullish(value.workQueueId)

//   return isValidWorkQueueId
// }

// type AutomationActionPauseAutomation = AutomationActionWithType<'pause-automation', {
//   automationId?: string | null,
// }>

// function isAutomationActionPauseAutomation(value: unknown): value is AutomationActionPauseAutomation {
//   if (!isAutomationActionTypeRecord(value, 'pause-automation')) {
//     return false
//   }

//   const isValidAutomationId = isString(value.automationId) || isNullish(value.automationId)

//   return isValidAutomationId
// }

// type AutomationActionResumeAutomation = AutomationActionWithType<'resume-automation', {
//   automationId?: string | null,
// }>

// function isAutomationActionResumeAutomation(value: unknown): value is AutomationActionResumeAutomation {
//   if (!isAutomationActionTypeRecord(value, 'resume-automation')) {
//     return false
//   }

//   const isValidAutomationId = isString(value.automationId) || isNullish(value.automationId)

//   return isValidAutomationId
// }

// type AutomationActionPauseWorkPool = AutomationActionWithType<'pause-work-pool', {
//   workPoolId?: string | null,
// }>

// function isAutomationActionPauseWorkPool(value: unknown): value is AutomationActionPauseWorkPool {
//   if (!isAutomationActionTypeRecord(value, 'pause-work-pool')) {
//     return false
//   }

//   const isValidWorkPoolId = isString(value.workPoolId) || isNullish(value.workPoolId)

//   return isValidWorkPoolId
// }

// type AutomationActionResumeWorkPool = AutomationActionWithType<'resume-work-pool', {
//   workPoolId?: string | null,
// }>

// function isAutomationActionResumeWorkPool(value: unknown): value is AutomationActionResumeWorkPool {
//   if (!isAutomationActionTypeRecord(value, 'resume-work-pool')) {
//     return false
//   }

//   const isValidWorkPoolId = isString(value.workPoolId) || isNullish(value.workPoolId)

//   return isValidWorkPoolId
// }

export type AutomationAction =
  // | AutomationActionCancelFlowRun
  | AutomationActionPauseDeployment
  | AutomationActionResumeDeployment
  // | AutomationActionResumeWorkQueue
  // | AutomationActionPauseFlowRun
  // | AutomationActionPauseWorkQueue
  // | AutomationActionRunDeployment
  // | AutomationActionSendNotification
  // | AutomationActionPauseAutomation
  // | AutomationActionResumeAutomation
  // | AutomationActionPauseWorkPool
  // | AutomationActionResumeWorkPool

export type AutomationActionFields<T extends AutomationAction> = Require<Partial<T>, 'type'>

const actionTypeGuardMap = {
  // 'cancel-flow-run': isAutomationActionCancelFlowRun,
  'pause-deployment': isAutomationActionPauseDeployment,
  'resume-deployment': isAutomationActionResumeDeployment,
  // 'pause-work-queue': isAutomationActionPauseWorkQueue,
  // 'resume-work-queue': isAutomationActionResumeWorkQueue,
  // 'run-deployment': isAutomationActionRunDeployment,
  // 'send-notification': isAutomationActionSendNotification,
  // 'suspend-flow-run': isAutomationActionPauseFlowRun,
  // 'pause-automation': isAutomationActionPauseAutomation,
  // 'resume-automation': isAutomationActionResumeAutomation,
  // 'pause-work-pool': isAutomationActionPauseWorkPool,
  // 'resume-work-pool': isAutomationActionResumeWorkPool,
} satisfies Record<AutomationActionType, (value: unknown) => boolean>

export function isAutomationAction(value: unknown): value is AutomationAction {
  const guards = Object.values(actionTypeGuardMap)

  return guards.some(guard => guard(value))
}