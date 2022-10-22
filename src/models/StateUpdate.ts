import { StateType } from './StateType'
export interface StateUpdateDetails {
  type: Uppercase<StateType>,
  message?: string,
}

export type StateUpdate = {
  state: StateUpdateDetails,
}
