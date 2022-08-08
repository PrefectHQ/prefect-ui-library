import { ServerStateType, StateDetailsRequest } from '@/models'

export type StateRequest = {
  type: ServerStateType,
  message?: string,
  state_details?: StateDetailsRequest | null,
  data?: Record<string, unknown>,
  timestamp?: string,
  name?: string,
}