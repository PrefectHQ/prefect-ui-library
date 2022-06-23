import { Notification } from '@/models/Notification'
import { MockFunction } from '@/services/Mocker'


export const randomNotification: MockFunction<Notification, [Partial<Notification>?]> = function(overrides = {}) {
  return new Notification({
    id: this.create('string'),
    created: this.create('date'),
    updated: this.create('date'),
    name: this.create('string'),
    isActive: this.create('boolean'),
    stateNames: this.createMany('stateType', this.create('number', [1, 3])),
    tags: this.createMany('string', this.create('number', [1, 3])),
    blockDocumentId: this.create('string'),
    ...overrides,
  })
}