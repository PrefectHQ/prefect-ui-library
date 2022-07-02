import { NotificationResponse } from '@/models/api/NotificationResponse'
import { Notification } from '@/models/Notification'
import { MapFunction } from '@/services/Mapper'

export const mapNotificationResponseToNotification: MapFunction<NotificationResponse, Notification> = function(source: NotificationResponse): Notification {
  return new Notification({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    isActive: source.is_active,
    stateNames: source.state_names,
    tags: source.tags,
    blockDocumentId: source.block_document_id,
  })
}
