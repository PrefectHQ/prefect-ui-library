import { CreatedBy } from '@/models/CreatedBy'
import { MockFunction } from '@/services/Mocker'
import { choice } from '@/utilities'

export const randomCreatedBy: MockFunction<CreatedBy, [Partial<CreatedBy>?]> = function(overrides = {}) {
  return {
    id: this.create('id'),
    displayValue: this.create('noun'),
    type: choice(['USER', 'BOT', 'DEPLOYMENT']),
    ...overrides,
  }
}