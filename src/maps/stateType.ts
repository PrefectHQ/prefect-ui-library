import { StateType, ServerStateType } from '@/models'
import { MapFunction } from '@/services/Mapper'

export const mapServerStateTypeToStateType: MapFunction<ServerStateType, StateType> = function(source) {
  return source.toLowerCase() as StateType
}

export const mapStateTypeToServerStateType: MapFunction<StateType, ServerStateType> = function(source) {
  return source.toUpperCase() as ServerStateType
}