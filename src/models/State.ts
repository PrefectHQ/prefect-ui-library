import { StateType } from './StateType'
import { StateDetails } from '@/models/StateDetails'

export type State = {
  id: string,
  type: StateType,
  message: string,
  stateDetails: StateDetails | null,
  data: Record<string, unknown>,
  timestamp: string,
  name: string,
}