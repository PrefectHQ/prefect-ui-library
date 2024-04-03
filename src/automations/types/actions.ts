import { ServerStateType, isServerStateType } from '@/models/StateType'
import { SchemaValues } from '@/schemas/types/schemaValues'
import { Equals, Require } from '@/types/utilities'
import { createTuple, isNullish, isRecord, isString } from '@/utilities'

export const { values: automationActionTypes, isValue: isAutomationActionType } = createTuple([
  'cancel-flow-run',
  'suspend-flow-run',
  'change-flow-run-state',
  'run-deployment',
  'pause-deployment',
  'resume-deployment',
  'pause-work-queue',
  'resume-work-queue',
  'pause-work-pool',
  'resume-work-pool',
  'pause-automation',
  'resume-automation',
  // 'send-notification',
])

export type AutomationActionType = typeof automationActionTypes[number]

export const automationActionTypeLabels = {
  'cancel-flow-run': 'Cancel a flow run',
  'suspend-flow-run': 'Suspend a flow run',
  'change-flow-run-state': 'Change flow run\'s state',
  'run-deployment': 'Run a deployment',
  'pause-deployment': 'Pause a deployment',
  'resume-deployment': 'Resume a deployment',
  'pause-work-queue': 'Pause a work queue',
  'resume-work-queue': 'Resume a work queue',
  'pause-work-pool': 'Pause a work pool',
  'resume-work-pool': 'Resume a work pool',
  'pause-automation': 'Pause an automation',
  'resume-automation': 'Resume an automation',
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

/*
 * Cancel a flow run
 */
export type AutomationActionCancelFlowRun = AutomationActionWithType<'cancel-flow-run'>

function isAutomationActionCancelFlowRun(value: unknown): value is AutomationActionCancelFlowRun {
  return isAutomationActionTypeRecord(value, 'cancel-flow-run')
}

/*
 * Suspend a flow run
 */
export type AutomationActionSuspendFlowRun = AutomationActionWithType<'suspend-flow-run'>

function isAutomationActionSuspendFlowRun(value: unknown): value is AutomationActionSuspendFlowRun {
  return isAutomationActionTypeRecord(value, 'suspend-flow-run')
}

/*
 * Change a flow run's state
 */
export type AutomationActionChangeFlowRunState = AutomationActionWithType<'change-flow-run-state', {
  name?: string | null,
  state: ServerStateType,
  message?: string | null,
}>

export function isAutomationActionChangeFlowRunState(value: unknown): value is AutomationActionChangeFlowRunState {
  if (!isAutomationActionTypeRecord(value, 'change-flow-run-state')) {
    return false
  }

  const isValidName = isString(value.name) || isNullish(value.name)
  const isValidState = isServerStateType(value.state)
  const isValidMessage = isString(value.message) || isNullish(value.message)

  return isValidName && isValidState && isValidMessage
}

/*
 * Run a deployment
 */
export type AutomationActionRunDeployment = AutomationActionWithType<'run-deployment', {
  deploymentId?: string | null,
  parameters: SchemaValues | null,
  jobVariables?: Record<string, unknown>,
}>

export function isAutomationActionRunDeployment(value: unknown): value is AutomationActionRunDeployment {
  if (!isAutomationActionTypeRecord(value, 'run-deployment')) {
    return false
  }

  const isValidDeploymentId = isString(value.deploymentId) || isNullish(value.deploymentId)
  const isValidParameters = isRecord(value.parameters) || isNullish(value.parameters)

  return isValidDeploymentId && isValidParameters
}

/*
 * Pause a deployment
 */
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

/*
 * Resume a deployment
 */
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
/*
 * Pause a work queue
 */
export type AutomationActionPauseWorkQueue = AutomationActionWithType<'pause-work-queue', {
  workQueueId?: string | null,
}>

function isAutomationActionPauseWorkQueue(value: unknown): value is AutomationActionPauseWorkQueue {
  if (!isAutomationActionTypeRecord(value, 'pause-work-queue')) {
    return false
  }

  const isValidWorkQueueId = isString(value.workQueueId) || isNullish(value.workQueueId)

  return isValidWorkQueueId
}

/*
 * Resume a work queue
 */
export type AutomationActionResumeWorkQueue = AutomationActionWithType<'resume-work-queue', {
  workQueueId?: string | null,
}>

function isAutomationActionResumeWorkQueue(value: unknown): value is AutomationActionResumeWorkQueue {
  if (!isAutomationActionTypeRecord(value, 'resume-work-queue')) {
    return false
  }

  const isValidWorkQueueId = isString(value.workQueueId) || isNullish(value.workQueueId)

  return isValidWorkQueueId
}

/*
 * Pause a work pool
 */
export type AutomationActionPauseWorkPool = AutomationActionWithType<'pause-work-pool', {
  workPoolId?: string | null,
}>

function isAutomationActionPauseWorkPool(value: unknown): value is AutomationActionPauseWorkPool {
  if (!isAutomationActionTypeRecord(value, 'pause-work-pool')) {
    return false
  }

  const isValidWorkPoolId = isString(value.workPoolId) || isNullish(value.workPoolId)

  return isValidWorkPoolId
}

/*
 * Resume a work pool
 */
export type AutomationActionResumeWorkPool = AutomationActionWithType<'resume-work-pool', {
  workPoolId?: string | null,
}>

function isAutomationActionResumeWorkPool(value: unknown): value is AutomationActionResumeWorkPool {
  if (!isAutomationActionTypeRecord(value, 'resume-work-pool')) {
    return false
  }

  const isValidWorkPoolId = isString(value.workPoolId) || isNullish(value.workPoolId)

  return isValidWorkPoolId
}

/*
 * Pause an automation
 */
export type AutomationActionPauseAutomation = AutomationActionWithType<'pause-automation', {
  automationId?: string | null,
}>

function isAutomationActionPauseAutomation(value: unknown): value is AutomationActionPauseAutomation {
  if (!isAutomationActionTypeRecord(value, 'pause-automation')) {
    return false
  }

  const isValidAutomationId = isString(value.automationId) || isNullish(value.automationId)

  return isValidAutomationId
}

/*
 * Resume an automation
 */
export type AutomationActionResumeAutomation = AutomationActionWithType<'resume-automation', {
  automationId?: string | null,
}>

function isAutomationActionResumeAutomation(value: unknown): value is AutomationActionResumeAutomation {
  if (!isAutomationActionTypeRecord(value, 'resume-automation')) {
    return false
  }

  const isValidAutomationId = isString(value.automationId) || isNullish(value.automationId)

  return isValidAutomationId
}

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


// type AutomationActionPauseFlowRun = AutomationActionWithType<'suspend-flow-run'>

// function isAutomationActionPauseFlowRun(value: unknown): value is AutomationActionPauseFlowRun {
//   return isAutomationActionTypeRecord(value, 'suspend-flow-run')
// }

export type AutomationAction =
  | AutomationActionCancelFlowRun
  | AutomationActionSuspendFlowRun
  | AutomationActionChangeFlowRunState
  | AutomationActionRunDeployment
  | AutomationActionPauseDeployment
  | AutomationActionResumeDeployment
  | AutomationActionPauseWorkQueue
  | AutomationActionResumeWorkQueue
  | AutomationActionPauseWorkPool
  | AutomationActionResumeWorkPool
  | AutomationActionPauseAutomation
  | AutomationActionResumeAutomation
  // | AutomationActionPauseFlowRun
  // | AutomationActionSendNotification

/*
 * if this is giving you a type error you forgot to add a response type for your action to the AutomationAction
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const automationActionHasAllActionTypes: Equals<AutomationAction['type'], AutomationActionType> = true

export type AutomationActionFields<T extends AutomationAction> = Require<Partial<T>, 'type'>

const actionTypeGuardMap = {
  'cancel-flow-run': isAutomationActionCancelFlowRun,
  'suspend-flow-run': isAutomationActionSuspendFlowRun,
  'change-flow-run-state': isAutomationActionChangeFlowRunState,
  'run-deployment': isAutomationActionRunDeployment,
  'pause-deployment': isAutomationActionPauseDeployment,
  'resume-deployment': isAutomationActionResumeDeployment,
  'pause-work-queue': isAutomationActionPauseWorkQueue,
  'resume-work-queue': isAutomationActionResumeWorkQueue,
  'pause-work-pool': isAutomationActionPauseWorkPool,
  'resume-work-pool': isAutomationActionResumeWorkPool,
  'pause-automation': isAutomationActionPauseAutomation,
  'resume-automation': isAutomationActionResumeAutomation,
  // 'send-notification': isAutomationActionSendNotification,
} satisfies Record<AutomationActionType, (value: unknown) => boolean>

export function isAutomationAction(value: unknown): value is AutomationAction {
  const guards = Object.values(actionTypeGuardMap)

  return guards.some(guard => guard(value))
}