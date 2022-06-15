import { INotificationResponse } from '@/models/INotificationResponse'
import { Notification } from '@/models/Notification'
import { MapFunction } from '@/services/Mapper'

export const mapINotificationResponseToNotification: MapFunction<INotificationResponse, Notification> = function(source: INotificationResponse): Notification {
  return new Notification({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    name: source.name,
    isActive: source.is_active,
    stateNames: source.stateNames,
    tags: source.tags,
    blockDocumentId: source.block_document_id,
  })
}
