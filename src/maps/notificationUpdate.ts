import { NotificationUpdateRequest } from '@/models/api/NotificationUpdateRequest'
import { NotificationUpdate } from '@/models/NotificationUpdate'
import { MapFunction } from '@/services/Mapper'

export const mapNotificationUpdateToNotificationUpdateRequest: MapFunction<NotificationUpdate, NotificationUpdateRequest> = function(source) {
  return {
    state_names: source.stateNames,
    tags: source.tags,
    is_active: source.isActive,
    block_document_id: source.blockDocumentId,
  }
}