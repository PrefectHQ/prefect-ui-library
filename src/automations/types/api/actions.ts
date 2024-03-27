import { AutomationActionWithType, isAutomationActionType } from '@/automations/types/actions'
import { isRecord } from '@/utilities'

export type AutomationActionResponse =
  | AutomationActionPauseDeploymentResponse
  | AutomationActionResumeDeploymentResponse

export function isAutomationActionResponse(value: unknown): value is AutomationActionResponse {
  return isRecord(value) && isAutomationActionType(value.type)
}

export type AutomationActionRequest = AutomationActionResponse

export type AutomationActionPauseDeploymentSelectedResponse = {
  source: 'selected',
  deployment_id: string,
}

export type AutomationActionPauseDeploymentInferredResponse = {
  source: 'inferred',
}

export type AutomationActionPauseDeploymentResponse = AutomationActionWithType<'pause-deployment', AutomationActionPauseDeploymentSelectedResponse | AutomationActionPauseDeploymentInferredResponse>

export type AutomationActionResumeDeploymentSelectedResponse = {
  source: 'selected',
  deployment_id: string,
}

export type AutomationActionResumeDeploymentInferredResponse = {
  source: 'inferred',
}

export type AutomationActionResumeDeploymentResponse = AutomationActionWithType<'resume-deployment', AutomationActionResumeDeploymentSelectedResponse | AutomationActionResumeDeploymentInferredResponse>