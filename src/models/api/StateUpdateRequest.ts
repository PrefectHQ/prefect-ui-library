import { StateType } from '../StateType'

export interface StateUpdateRequestDetails {
  type: Uppercase<StateType>,
  name?: string,
  message?: string,
}

export type StateUpdateRequest = {
  state: StateUpdateRequestDetails,
}
