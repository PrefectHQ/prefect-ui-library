import { ServerStateType } from '../StateType'

export interface StateUpdateRequestDetails {
  type: ServerStateType,
  name?: string,
  message?: string,
}

export type StateUpdateRequest = {
  state: StateUpdateRequestDetails,
}
