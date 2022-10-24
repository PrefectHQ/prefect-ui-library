import { CreatedOrUpdatedByResponse } from '@/models/api/CreatedOrUpdatedByResponse'
import { CreatedOrUpdatedBy } from '@/models/CreatedOrUpdatedBy'
import { MapFunction } from '@/services/Mapper'

export const mapCreatedOrUpdatedByResponseToCreatedOrUpdatedBy: MapFunction<CreatedOrUpdatedByResponse, CreatedOrUpdatedBy> = function(source: CreatedOrUpdatedByResponse): CreatedOrUpdatedBy {
  return {
    id: source.id,
    displayValue: source.display_value,
    type: source.type,
  }
}

export const mapCreatedOrUpdatedByToCreatedOrUpdatedByResponse: MapFunction<CreatedOrUpdatedBy, CreatedOrUpdatedByResponse> = function(source: CreatedOrUpdatedBy): CreatedOrUpdatedByResponse {
  return {
    'id': source.id,
    'display_value': source.displayValue,
    'type': source.type,
  }
}