
import { ServerStateType } from '@/models/StateType'

export type UiFlowRunHistoryResponse = {
  id: string,
  state_type: ServerStateType,
  duration: number,
  lateness: number,
  timestamp: string,
}