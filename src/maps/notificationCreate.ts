import { NotificationCreateRequest } from '@/models/api/NotificationCreateRequest'
import { NotificationCreate } from '@/models/NotificationCreate'
import { MapFunction } from '@/services/Mapper'

export const mapNotificationCreateToNotificationCreateRequest: MapFunction<NotificationCreate, NotificationCreateRequest> = function(source) {
  return {
    state_names: source.stateNames ?? [],
    tags: source.tags ?? [],
    is_active: true,
    block_document_id: source.blockDocumentId,
  }
}