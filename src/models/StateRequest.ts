import { ServerStateType, StateDetailsRequest } from '@/models'

export type StateRequest = {
  id: string,
  type: ServerStateType,
  message: string,
  state_details: Partial<StateDetailsRequest> | null,
  data: Record<string, unknown>,
  timestamp: string,
  name: string,
}