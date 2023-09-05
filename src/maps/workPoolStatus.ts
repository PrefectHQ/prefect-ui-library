import { WorkPoolStatus, ServerWorkPoolStatus } from '@/models'
import { MapFunction } from '@/services/Mapper'

export const mapServerWorkPoolStatusToWorkPoolStatus: MapFunction<ServerWorkPoolStatus, WorkPoolStatus> = function(source) {
  return source === null ? null : source.toLowerCase() as WorkPoolStatus
}

export const mapWorkPoolStatusToServerWorkPoolStatus: MapFunction<WorkPoolStatus, ServerWorkPoolStatus> = function(source) {
  return source === null ? null : source.toUpperCase() as ServerWorkPoolStatus
}