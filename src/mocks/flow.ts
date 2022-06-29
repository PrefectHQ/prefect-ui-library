import { Flow } from '@/models/Flow'
import { MockFunction } from '@/services/Mocker'

export const randomFlow: MockFunction<Flow, [Partial<Flow>?]> = function(overrides = {}) {
  return new Flow({
    id: this.create('string'),
    created: this.create('date'),
    updated: this.create('date'),
    name: this.create('string'),
    ...overrides,
  })
}
