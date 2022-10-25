import { StateType } from '../StateType'
export interface StateUpdateDetails {
  type: Uppercase<StateType>,
  name?: string,
  message?: string,
}

export type StateUpdateRequest = {
  state: StateUpdateDetails,
}
