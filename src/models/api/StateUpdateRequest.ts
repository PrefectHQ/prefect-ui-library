import { StateDetailsRequest } from '../StateDetailsRequest'
import { ServerStateType } from '../StateType'

export interface StateUpdateRequestDetails {
  type: ServerStateType,
  name?: string,
  message?: string,
  state_details?: StateDetailsRequest,
}

export type StateUpdateRequest = {
  state: StateUpdateRequestDetails,
}
