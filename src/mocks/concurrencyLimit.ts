import { ConcurrencyLimit } from '@/models/ConcurrencyLimit'
import { MockFunction } from '@/services/Mocker'

export const randomConcurrencyLimit: MockFunction<ConcurrencyLimit, [Partial<ConcurrencyLimit>?]> = function(overrides = {}) {
  return {
    id: this.create('id'),
    created: this.create('date'),
    updated: this.create('date'),
    tag: this.create('noun'),
    concurrencyLimit: this.create('number'),
    activeSlots: this.createMany('string', this.create('number', [0, 10])),
    ...overrides,
  }
}
