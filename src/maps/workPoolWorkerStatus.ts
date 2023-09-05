import { WorkPoolWorkerStatus, ServerWorkPoolWorkerStatus } from '@/models'
import { MapFunction } from '@/services/Mapper'

export const mapServerWorkPoolWorkerStatusToWorkPoolWorkerStatus: MapFunction<ServerWorkPoolWorkerStatus, WorkPoolWorkerStatus> = function(source) {
  return source.toLowerCase() as WorkPoolWorkerStatus
}

export const mapWorkPoolWorkerStatusToServerWorkPoolWorkerStatus: MapFunction<WorkPoolWorkerStatus, ServerWorkPoolWorkerStatus> = function(source) {
  return source.toUpperCase() as ServerWorkPoolWorkerStatus
}