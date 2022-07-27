import { StateType } from './StateType'
import { IStateDetails } from '@/models/StateDetails'

export type IState = {
  id: string,
  type: StateType,
  message: string,
  stateDetails: IStateDetails | null,
  data: Record<string, unknown>,
  timestamp: string,
  name: string,
}