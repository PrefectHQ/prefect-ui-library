import { StateType } from './StateType'
import { IFlowData } from '@/models/FlowData'
import { IStateDetails } from '@/models/StateDetails'

export type IState = {
  id: string,
  type: StateType,
  message: string,
  stateDetails: IStateDetails | null,
  data: IFlowData | null,
  timestamp: string,
  name: string,
}