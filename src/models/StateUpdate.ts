import { StateType } from './StateType'
import { StateDetails } from '@/models/StateDetails'

export interface StateUpdateDetails {
  type: StateType,
  name?: string,
  message?: string,
  stateDetails?: StateDetails,
}

export type StateUpdate = {
  state: StateUpdateDetails,
}
