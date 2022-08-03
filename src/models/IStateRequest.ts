import { StateType, IStateDetailsRequest } from '@/models'

export type IStateRequest = {
  id: string,
  type: StateType,
  message: string,
  state_details: Partial<IStateDetailsRequest> | null,
  data: Record<string, unknown>,
  timestamp: string,
  name: string,
}