import { CreatedOrUpdatedByResponse } from '@/models/api/CreatedOrUpdatedByResponse'
import { CreatedOrUpdatedBy } from '@/models/CreatedOrUpdatedBy'
import { MapFunction } from '@/services/Mapper'

export const mapCreatedOrUpdatedByResponseToCreatedOrUpdatedBy: MapFunction<CreatedOrUpdatedByResponse, CreatedOrUpdatedBy> = function(source) {
  return {
    id: source.id,
    displayValue: source.display_value,
    type: source.type,
  }
}