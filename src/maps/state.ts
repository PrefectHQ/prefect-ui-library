import { StateCreate, StateRequest } from '@/models'
import { StateResponse } from '@/models/api/StateResponse'
import { State } from '@/models/State'
import { MapFunction } from '@/services/Mapper'

export const mapStateResponseToState: MapFunction<StateResponse, State> = function(source) {
  return {
    id: source.id,
    type: this.map('ServerStateType', source.type, 'StateType'),
    message: source.message,
    stateDetails: this.map('StateDetailsResponse', source.state_details, 'StateDetails'),
    data: source.data,
    timestamp: source.timestamp,
    name: source.name,
  }
}

export const mapStateToStateResponse: MapFunction<State, StateResponse> = function(source) {
  return {
    id: source.id,
    type: this.map('StateType', source.type, 'ServerStateType'),
    message: source.message,
    state_details: this.map('StateDetails', source.stateDetails, 'StateDetailsResponse'),
    data: source.data,
    timestamp: source.timestamp,
    name: source.name,
  }
}

export const mapStateCreateToStateRequest: MapFunction<StateCreate, StateRequest> = function(source) {
  return {
    type: this.map('StateType', source.type, 'ServerStateType'),
    message: source.message,
    state_details: source.stateDetails ? this.map('StateDetailsCreate', source.stateDetails, 'StateDetailsRequest') : {},
    data: source.data,
    timestamp: source.timestamp,
    name: source.name,
  }
}