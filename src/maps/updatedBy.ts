import { UpdatedByResponse } from '@/models/api/UpdatedByResponse'
import { UpdatedBy } from '@/models/UpdatedBy'
import { MapFunction } from '@/services/Mapper'

export const mapUpdatedByResponseToUpdatedBy: MapFunction<UpdatedByResponse, UpdatedBy> = function(source: UpdatedByResponse): UpdatedBy {
  return {
    id: source.id,
    displayValue: source.display_value,
    type: source.type,
  }
}

export const mapUpdatedByToUpdatedByResponse: MapFunction<UpdatedBy, UpdatedByResponse> = function(source: UpdatedBy): UpdatedByResponse {
  return {
    'id': source.id,
    'display_value': source.displayValue,
    'type': source.type,
  }
}