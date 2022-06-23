import { Notification } from '@/models/Notification'
import { MockFunction } from '@/services/Mocker'


export const randomNotification: MockFunction<Notification> = function(notification?: Partial<Notification>) {
  return new Notification({
    id: notification?.id ?? this.create('string'),
    created: notification?.created ?? this.create('date'),
    updated: notification?.updated ?? this.create('date'),
    name: notification?.name ?? this.create('string'),
    isActive: notification?.isActive ?? this.create('boolean'),
    stateNames: notification?.stateNames ?? this.createMany('stateType', this.create('number', [1, 3])),
    tags: notification?.tags ?? this.createMany('string', this.create('number', [1, 3])),
    blockDocumentId: notification?.blockDocumentId ?? this.create('string'),
  })
}