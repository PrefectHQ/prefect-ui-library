import { StateType } from './StateType'
import { IStateDetailsResponse } from '@/models/IStateDetailsResponse'

export type IStateResponse = {
  id: string,
  type: Uppercase<StateType>,
  message: string,
  state_details: IStateDetailsResponse | null,
  data: Record<string, unknown>,
  timestamp: string,
  name: string,
}