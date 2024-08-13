import { StateDetails } from '@/models/StateDetails'
import { StateType } from '@/models/StateType'

export type State = {
  id: string,
  kind: 'state',
  type: StateType,
  message: string,
  stateDetails: StateDetails | null,
  data: Record<string, unknown>,
  timestamp: Date,
  name: string,
}