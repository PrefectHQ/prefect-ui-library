import { StateType } from '@/models/StateType'

export interface StateUpdateDetails {
  type: StateType,
  name?: string,
  message?: string,
}

export type StateUpdate = {
  state: StateUpdateDetails,
}
