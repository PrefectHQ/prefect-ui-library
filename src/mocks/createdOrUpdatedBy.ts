import { CreatedOrUpdatedBy } from '@/models/CreatedOrUpdatedBy'
import { MockFunction } from '@/services/Mocker'
import { choice } from '@/utilities'

export const randomCreatedOrUpdatedBy: MockFunction<CreatedOrUpdatedBy, [Partial<CreatedOrUpdatedBy>?]> = function(overrides = {}) {
  return {
    id: this.create('id'),
    displayValue: this.create('noun'),
    type: choice(['USER', 'BOT', 'DEPLOYMENT']),
    ...overrides,
  }
}