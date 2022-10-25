import { StateUpdate, StateUpdateRequest } from '@/models'
import { MapFunction } from '@/services/Mapper'

export const mapStateUpdateToStateUpdateRequest: MapFunction<StateUpdate, StateUpdateRequest> = function(source: StateUpdate): StateUpdateRequest {
  return {
    state: {
      ...source.state,
      type: this.map('StateType', source.state.type, 'ServerStateType'),
    },
  }
}

