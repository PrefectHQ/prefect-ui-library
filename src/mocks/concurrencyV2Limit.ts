import { ConcurrencyV2Limit } from '@/models/ConcurrencyV2Limit'
import { MockFunction } from '@/services/Mocker'

export const randomConcurrencyV2Limit: MockFunction<ConcurrencyV2Limit, [Partial<ConcurrencyV2Limit>?]> = function(overrides = {}) {
  return {
    id: this.create('id'),
    name: this.create('noun'),
    limit: this.create('number'),
    created: this.create('date'),
    updated: this.create('date'),
    ...overrides,
  }
}
