import { stateType, StateType } from '@/models/StateType'
import { MockFunction } from '@/services/Mocker'

export const randomStateType: MockFunction<StateType, []> = function() {
  return stateType[Math.floor(Math.random() * stateType.length)]
}