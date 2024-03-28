/* eslint-disable camelcase */
import { AutomationAction, AutomationActionPauseDeployment, AutomationActionResumeDeployment } from '@/automations/types/actions'
import { AutomationActionPauseDeploymentResponse, AutomationActionRequest, AutomationActionResponse, AutomationActionResumeDeploymentResponse } from '@/automations/types/api/actions'
import { MapFunction } from '@/services/Mapper'

export const mapAutomationActionResponseToAutomationAction: MapFunction<AutomationActionResponse, AutomationAction> = function(response) {
  switch (response.type) {
    case 'pause-deployment':
    case 'resume-deployment':
      return mapPauseResumeDeploymentResponse(response)
    case 'cancel-flow-run':
      return response
    default:
      const exhaustive: never = response
      throw new Error(`Automation action type is missing case for: ${(exhaustive as AutomationActionResponse).type}`)
  }
}

export const mapAutomationActionToAutomationActionRequest: MapFunction<AutomationAction, AutomationActionRequest> = function(response) {
  switch (response.type) {
    case 'pause-deployment':
    case 'resume-deployment':
      return mapPauseResumeDeploymentRequest(response)
    case 'cancel-flow-run':
      return response
    default:
      const exhaustive: never = response
      throw new Error(`Automation action type is missing case for: ${(exhaustive as AutomationActionResponse).type}`)
  }
}

function mapPauseResumeDeploymentRequest(action: AutomationActionPauseDeployment | AutomationActionResumeDeployment): AutomationActionPauseDeploymentResponse | AutomationActionResumeDeploymentResponse {
  if (!action.deploymentId) {
    return {
      type: action.type,
      source: 'inferred',
    }
  }

  return {
    type: action.type,
    source: 'selected',
    deployment_id: action.deploymentId,
  }
}

function mapPauseResumeDeploymentResponse(action: AutomationActionPauseDeploymentResponse | AutomationActionResumeDeploymentResponse): AutomationActionPauseDeployment | AutomationActionResumeDeployment {
  if (action.source === 'inferred') {
    return {
      type: action.type,
      deploymentId: null,
    }
  }

  return {
    type: action.type,
    deploymentId: action.deployment_id,
  }
}