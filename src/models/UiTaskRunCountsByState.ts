import { StateType } from '@/models/StateType'

export type UiTaskRunCountsByState = {
  [key in StateType]?: number
}