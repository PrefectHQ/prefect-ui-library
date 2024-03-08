import { ServerStateType } from '@/models/StateType'

export type UiTaskRunCountsByStateResponse = {
  [key in ServerStateType]?: number
}