import { StateDetailsResponse } from '@/models/api/StateDetailsResponse'
import { StateType } from '@/models/StateType'

export type StateResponse = {
  id: string,
  type: Uppercase<StateType>,
  message: string,
  state_details: StateDetailsResponse | null,
  data: Record<string, unknown>,
  timestamp: string,
  name: string,
}