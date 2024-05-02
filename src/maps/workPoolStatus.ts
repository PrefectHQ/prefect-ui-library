import { WorkPoolStatus, ServerWorkPoolStatus, isWorkPoolStatus, isServerWorkPoolStatus } from '@/models'
import { MapFunction } from '@/services/Mapper'

export const mapServerWorkPoolStatusToWorkPoolStatus: MapFunction<ServerWorkPoolStatus, WorkPoolStatus> = function(source) {
  const status = source.toLowerCase()

  if (isWorkPoolStatus(status)) {
    return status
  }

  throw new Error(`ServerWorkPoolStatus unable to be mapped to WorkPoolStatus: ${source}`)
}

export const mapWorkPoolStatusToServerWorkPoolStatus: MapFunction<WorkPoolStatus, ServerWorkPoolStatus> = function(source) {
  const status = source.toLowerCase()

  if (isServerWorkPoolStatus(status)) {
    return status
  }

  throw new Error(`WorkPoolStatus unable to be mapped to ServerWorkPoolStatus: ${source}`)
}