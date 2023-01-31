import { StateUpdate, StateUpdateRequest } from '@/models'
import { MapFunction } from '@/services/Mapper'

export const mapStateUpdateToStateUpdateRequest: MapFunction<StateUpdate, StateUpdateRequest> = function(source) {
  const { type, stateDetails, ...state } = source.state
  return {
    state: {
      ...state,
      type: this.map('StateType', type, 'ServerStateType'),
      state_details: this.map('StateDetails', stateDetails, 'StateDetailsRequest'),
    },
  }
}

