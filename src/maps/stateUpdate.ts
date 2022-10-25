import { StateType, StateUpdate, StateUpdateRequest } from '@/models'
import { MapFunction } from '@/services/Mapper'

export const mapStateUpdateToStateUpdateRequest: MapFunction<StateUpdate, StateUpdateRequest> = function(source: StateUpdate): StateUpdateRequest {
  const uppercaseType: Uppercase<StateType> = source.state.type.toLocaleUpperCase() as Uppercase<StateType>
  return { state: { ...source.state, type: uppercaseType } }
}

