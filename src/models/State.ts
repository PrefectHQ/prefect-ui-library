import { StateDetails } from '@/models/StateDetails'
import { StateType } from '@/models/StateType'

export type State = {
  id: string,
  type: StateType,
  message: string,
  stateDetails: StateDetails | null,
  data: Record<string, unknown>,
  timestamp: string,
  name: string,
}