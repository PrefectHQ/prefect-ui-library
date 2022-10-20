import { CreatedByResponse } from '@/models/api/CreatedByResponse'
import { CreatedBy } from '@/models/CreatedBy'
import { MapFunction } from '@/services/Mapper'

export const mapCreatedByResponseToCreatedBy: MapFunction<CreatedByResponse, CreatedBy> = function(source: CreatedByResponse): CreatedBy {
  return {
    id: source.id,
    displayValue: source.display_value,
    type: source.type,
  }
}

export const mapCreatedByToCreatedByResponse: MapFunction<CreatedBy, CreatedByResponse> = function(source: CreatedBy): CreatedByResponse {
  return {
    'id': source.id,
    'display_value': source.displayValue,
    'type': source.type,
  }
}