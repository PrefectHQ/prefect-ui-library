import { UpdatedBy } from '@/models/UpdatedBy'
import { MockFunction } from '@/services/Mocker'
import { choice } from '@/utilities'

export const randomUpdatedBy: MockFunction<UpdatedBy, [Partial<UpdatedBy>?]> = function(overrides = {}) {
  return {
    id: this.create('id'),
    displayValue: this.create('noun'),
    type: choice(['USER', 'BOT', 'DEPLOYMENT']),
    ...overrides,
  }
}