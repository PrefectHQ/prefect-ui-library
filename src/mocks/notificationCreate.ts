import { NotificationCreate } from '@/models'
import { MockFunction } from '@/services/Mocker'

export const randomNotificationCreate: MockFunction<NotificationCreate, [Partial<NotificationCreate>?]> = function(overrides = {}) {
  const { isActive, stateNames, tags, blockDocumentId } = this.create('notification')

  return {
    isActive,
    stateNames,
    tags,
    blockDocumentId,
    ...overrides,
  }
}