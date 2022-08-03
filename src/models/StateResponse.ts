import { StateType } from './StateType'
import { StateDetailsResponse } from '@/models/StateDetailsResponse'

export type StateResponse = {
  id: string,
  type: Uppercase<StateType>,
  message: string,
  state_details: StateDetailsResponse | null,
  data: Record<string, unknown>,
  timestamp: string,
  name: string,
}