import { ServerStateType, IStateDetailsRequest } from '@/models'

export type IStateRequest = {
  id: string,
  type: ServerStateType,
  message: string,
  state_details: Partial<IStateDetailsRequest> | null,
  data: Record<string, unknown>,
  timestamp: string,
  name: string,
}