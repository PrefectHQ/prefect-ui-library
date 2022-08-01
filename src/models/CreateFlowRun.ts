import { StateType, ServerStateType } from '@/models/StateType'

// this type is incomplete
// https://orion-docs.prefect.io/api-ref/rest-api/#/Deployments/create_flow_run_from_deployment_deployments__id__create_flow_run_post
export type CreateFlowRun = {
  name?: string,
  parameters?: Record<string, unknown>,
  tags?: string[],
  state: {
    type: StateType,
    message: string,
    stateDetails?: {
      scheduledTime?: Date,
    },
  },
}

export type CreateFlowRunRequest = {
  name?: string,
  parameters?: Record<string, unknown>,
  tags?: string[],
  state: {
    type: ServerStateType,
    message?: string,
    state_details?: {
      scheduled_time?: string,
    },
  },
}