import { StateType, StateDetailsCreate } from '@/models'

export type StateCreate = {
  type: StateType,
  message?: string,
  stateDetails?: StateDetailsCreate,
  data?: Record<string, unknown>,
  timestamp?: Date,
  name?: string,
}