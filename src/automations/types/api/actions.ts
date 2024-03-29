import { AutomationActionType, AutomationActionWithType, isAutomationActionType } from '@/automations/types/actions'
import { Equals } from '@/types/utilities'
import { isRecord } from '@/utilities'

export type AutomationActionResponse =
| AutomationActionCancelFlowRunResponse
| AutomationActionSuspendFlowRunResponse
| AutomationActionPauseDeploymentResponse
| AutomationActionResumeDeploymentResponse
| AutomationActionPauseWorkQueueResponse
| AutomationActionResumeWorkQueueResponse
| AutomationActionPauseWorkPoolResponse
| AutomationActionResumeWorkPoolResponse
| AutomationActionPauseAutomationResponse
| AutomationActionResumeAutomationResponse

export type AutomationActionRequest = AutomationActionResponse

/*
 * if this is giving you a type error you forgot to add a response type for your action to the AutomationActionResponseType
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const automationActionResponseHasAllActionTypes: Equals<AutomationActionResponse['type'], AutomationActionType> = true

export function isAutomationActionResponse(value: unknown): value is AutomationActionResponse {
  return isRecord(value) && isAutomationActionType(value.type)
}

/*
 * Cancel a flow run
 */
export type AutomationActionCancelFlowRunResponse = AutomationActionWithType<'cancel-flow-run'>

/*
 * Suspend a flow run
 */
export type AutomationActionSuspendFlowRunResponse = AutomationActionWithType<'suspend-flow-run'>

/*
 * Pause a deployment
 */
export type AutomationActionPauseDeploymentSelectedResponse = {
  source: 'selected',
  deployment_id: string,
}

export type AutomationActionPauseDeploymentInferredResponse = {
  source: 'inferred',
}

export type AutomationActionPauseDeploymentResponse = AutomationActionWithType<'pause-deployment', AutomationActionPauseDeploymentSelectedResponse | AutomationActionPauseDeploymentInferredResponse>

/*
 * Resume a deployment
 */
export type AutomationActionResumeDeploymentSelectedResponse = {
  source: 'selected',
  deployment_id: string,
}

export type AutomationActionResumeDeploymentInferredResponse = {
  source: 'inferred',
}

export type AutomationActionResumeDeploymentResponse = AutomationActionWithType<'resume-deployment', AutomationActionResumeDeploymentSelectedResponse | AutomationActionResumeDeploymentInferredResponse>

/*
 * Pause a work queue
 */
export type AutomationActionPauseWorkQueueSelectedResponse = {
  source: 'selected',
  work_queue_id: string,
}

export type AutomationActionPauseWorkQueueInferredResponse = {
  source: 'inferred',
}

export type AutomationActionPauseWorkQueueResponse = AutomationActionWithType<'pause-work-queue', AutomationActionPauseWorkQueueSelectedResponse | AutomationActionPauseWorkQueueInferredResponse>

/*
 * Resume a work queue
 */
export type AutomationActionResumeWorkQueueSelectedResponse = {
  source: 'selected',
  work_queue_id: string,
}

export type AutomationActionResumeWorkQueueInferredResponse = {
  source: 'inferred',
}

export type AutomationActionResumeWorkQueueResponse = AutomationActionWithType<'resume-work-queue', AutomationActionResumeWorkQueueSelectedResponse | AutomationActionResumeWorkQueueInferredResponse>

/*
 * Pause a work pool
 */
export type AutomationActionPauseWorkPoolSelectedResponse = {
  source: 'selected',
  work_pool_id: string,
}

export type AutomationActionPauseWorkPoolInferredResponse = {
  source: 'inferred',
}

export type AutomationActionPauseWorkPoolResponse = AutomationActionWithType<'pause-work-pool', AutomationActionPauseWorkPoolSelectedResponse | AutomationActionPauseWorkPoolInferredResponse>

/*
 * Resume a work pool
 */
export type AutomationActionResumeWorkPoolSelectedResponse = {
  source: 'selected',
  work_pool_id: string,
}

export type AutomationActionResumeWorkPoolInferredResponse = {
  source: 'inferred',
}

export type AutomationActionResumeWorkPoolResponse = AutomationActionWithType<'resume-work-pool', AutomationActionResumeWorkPoolSelectedResponse | AutomationActionResumeWorkPoolInferredResponse>

/*
 * Pause an automation
 */
export type AutomationActionPauseAutomationSelectedResponse = {
  source: 'selected',
  automation_id: string,
}

export type AutomationActionPauseAutomationInferredResponse = {
  source: 'inferred',
}

export type AutomationActionPauseAutomationResponse = AutomationActionWithType<'pause-automation', AutomationActionPauseAutomationSelectedResponse | AutomationActionPauseAutomationInferredResponse>

/*
 * Resume an automation
 */
export type AutomationActionResumeAutomationSelectedResponse = {
  source: 'selected',
  automation_id: string,
}

export type AutomationActionResumeAutomationInferredResponse = {
  source: 'inferred',
}

export type AutomationActionResumeAutomationResponse = AutomationActionWithType<'resume-automation', AutomationActionResumeAutomationSelectedResponse | AutomationActionResumeAutomationInferredResponse>