import { StateType, IStateDetailsRequest } from '@/models'

export type IStateRequest = Partial<{
  name: string,
  type: StateType,
  message: string,
  state_details: IStateDetailsRequest | null,
  data: Record<string, unknown>,
}>