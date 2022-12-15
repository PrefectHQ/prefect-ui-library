import { StateDetails } from '@/models/StateDetails'
import { StateType } from '@/models/StateType'

export interface StateUpdateDetails {
  type: StateType,
  name?: string,
  message?: string,
  stateDetails?: StateDetails,
}

export type StateUpdate = {
  state: StateUpdateDetails,
}
