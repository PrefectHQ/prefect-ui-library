/* eslint-disable camelcase */
import {
  AutomationAction,
  AutomationActionCallWebhook,
  AutomationActionPauseAutomation,
  AutomationActionPauseDeployment,
  AutomationActionPauseWorkPool,
  AutomationActionPauseWorkQueue,
  AutomationActionResumeAutomation,
  AutomationActionResumeDeployment,
  AutomationActionResumeWorkPool,
  AutomationActionResumeWorkQueue,
  AutomationActionRunDeployment,
  AutomationActionSendNotification
} from '@/automations/types/actions'
import {
  AutomationActionCallWebhookResponse,
  AutomationActionPauseAutomationResponse,
  AutomationActionPauseDeploymentResponse,
  AutomationActionPauseWorkPoolResponse,
  AutomationActionPauseWorkQueueResponse,
  AutomationActionRequest,
  AutomationActionResponse,
  AutomationActionResumeAutomationResponse,
  AutomationActionResumeDeploymentResponse,
  AutomationActionResumeWorkPoolResponse,
  AutomationActionResumeWorkQueueResponse,
  AutomationActionRunDeploymentResponse,
  AutomationActionSendNotificationResponse
} from '@/automations/types/api/actions'
import { MapFunction } from '@/services/Mapper'

export const mapAutomationActionResponseToAutomationAction: MapFunction<AutomationActionResponse, AutomationAction> = function(response) {
  switch (response.type) {
    case 'run-deployment':
      return mapRunDeploymentResponse(response)
    case 'pause-deployment':
    case 'resume-deployment':
      return mapPauseResumeDeploymentResponse(response)
    case 'pause-work-queue':
    case 'resume-work-queue':
      return mapPauseResumeWorkQueueResponse(response)
    case 'pause-work-pool':
    case 'resume-work-pool':
      return mapPauseResumeWorkPoolResponse(response)
    case 'pause-automation':
    case 'resume-automation':
      return mapPauseResumeAutomationResponse(response)
    case 'send-notification':
      return mapSendNotificationResponse(response)
    case 'call-webhook':
      return mapCallWebhookResponse(response)
    case 'cancel-flow-run':
    case 'suspend-flow-run':
    case 'resume-flow-run':
    case 'change-flow-run-state':
    case 'do-nothing':
      return response
    default:
      const exhaustive: never = response
      throw new Error(`Automation action type is missing case for: ${(exhaustive as AutomationActionResponse).type}`)
  }
}

export const mapAutomationActionToAutomationActionRequest: MapFunction<AutomationAction, AutomationActionRequest> = function(request) {
  switch (request.type) {
    case 'run-deployment':
      return mapRunDeploymentRequest(request)
    case 'pause-deployment':
    case 'resume-deployment':
      return mapPauseResumeDeploymentRequest(request)
    case 'pause-work-queue':
    case 'resume-work-queue':
      return mapPauseResumeWorkQueueRequest(request)
    case 'pause-work-pool':
    case 'resume-work-pool':
      return mapPauseResumeWorkPoolRequest(request)
    case 'pause-automation':
    case 'resume-automation':
      return mapPauseResumeAutomationRequest(request)
    case 'send-notification':
      return mapSendNotificationRequest(request)
    case 'call-webhook':
      return mapCallWebhookRequest(request)
    case 'cancel-flow-run':
    case 'suspend-flow-run':
    case 'change-flow-run-state':
    case 'resume-flow-run':
    case 'do-nothing':
      return request
    default:
      const exhaustive: never = request
      throw new Error(`Automation action type is missing case for: ${(exhaustive as AutomationActionResponse).type}`)
  }
}

function mapRunDeploymentRequest(action: AutomationActionRunDeployment): AutomationActionRunDeploymentResponse {
  if (!action.deploymentId) {
    return {
      type: action.type,
      source: 'inferred',
    }
  }

  return {
    type: action.type,
    source: 'selected',
    parameters: action.parameters,
    deployment_id: action.deploymentId,
    job_variables: action.jobVariables,
  }
}

function mapRunDeploymentResponse(action: AutomationActionRunDeploymentResponse): AutomationActionRunDeployment {
  if (action.source === 'inferred') {
    return {
      type: action.type,
      deploymentId: null,
      parameters: null,
      jobVariables: undefined,
    }
  }

  return {
    type: action.type,
    parameters: action.parameters,
    deploymentId: action.deployment_id,
    jobVariables: action.job_variables ?? {},
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

function mapPauseResumeWorkQueueRequest(action: AutomationActionPauseWorkQueue | AutomationActionResumeWorkQueue): AutomationActionPauseWorkQueueResponse | AutomationActionResumeWorkQueueResponse {
  if (!action.workQueueId) {
    return {
      type: action.type,
      source: 'inferred',
    }
  }

  return {
    type: action.type,
    source: 'selected',
    work_queue_id: action.workQueueId,
  }
}

function mapPauseResumeWorkQueueResponse(action: AutomationActionPauseWorkQueueResponse | AutomationActionResumeWorkQueueResponse): AutomationActionPauseWorkQueue | AutomationActionResumeWorkQueue {
  if (action.source === 'inferred') {
    return {
      type: action.type,
      workQueueId: null,
    }
  }

  return {
    type: action.type,
    workQueueId: action.work_queue_id,
  }
}

function mapPauseResumeWorkPoolRequest(action: AutomationActionPauseWorkPool | AutomationActionResumeWorkPool): AutomationActionPauseWorkPoolResponse | AutomationActionResumeWorkPoolResponse {
  if (!action.workPoolId) {
    return {
      type: action.type,
      source: 'inferred',
    }
  }

  return {
    type: action.type,
    source: 'selected',
    work_pool_id: action.workPoolId,
  }
}

function mapPauseResumeWorkPoolResponse(action: AutomationActionPauseWorkPoolResponse | AutomationActionResumeWorkPoolResponse): AutomationActionPauseWorkPool | AutomationActionResumeWorkPool {
  if (action.source === 'inferred') {
    return {
      type: action.type,
      workPoolId: null,
    }
  }

  return {
    type: action.type,
    workPoolId: action.work_pool_id,
  }
}


function mapPauseResumeAutomationRequest(action: AutomationActionPauseAutomation | AutomationActionResumeAutomation): AutomationActionPauseAutomationResponse | AutomationActionResumeAutomationResponse {
  if (!action.automationId) {
    return {
      type: action.type,
      source: 'inferred',
    }
  }

  return {
    type: action.type,
    source: 'selected',
    automation_id: action.automationId,
  }
}

function mapPauseResumeAutomationResponse(action: AutomationActionPauseAutomationResponse | AutomationActionResumeAutomationResponse): AutomationActionPauseAutomation | AutomationActionResumeAutomation {
  if (action.source === 'inferred') {
    return {
      type: action.type,
      automationId: null,
    }
  }

  return {
    type: action.type,
    automationId: action.automation_id,
  }
}

function mapSendNotificationRequest({ type, blockDocumentId, subject, body }: AutomationActionSendNotification): AutomationActionSendNotificationResponse {
  return {
    type,
    block_document_id: blockDocumentId,
    subject,
    body,
  }
}

function mapSendNotificationResponse({ type, block_document_id, subject, body }: AutomationActionSendNotificationResponse): AutomationActionSendNotification {
  return {
    type,
    blockDocumentId: block_document_id,
    subject,
    body,
  }
}

function mapCallWebhookRequest({ type, blockDocumentId, payload }: AutomationActionCallWebhook): AutomationActionCallWebhookResponse {
  return {
    type,
    block_document_id: blockDocumentId,
    payload,
  }
}

function mapCallWebhookResponse({ type, block_document_id, payload }: AutomationActionCallWebhookResponse): AutomationActionCallWebhook {
  return {
    type,
    blockDocumentId: block_document_id,
    payload,
  }
}
