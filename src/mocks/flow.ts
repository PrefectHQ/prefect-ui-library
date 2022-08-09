import { Flow } from '@/models/Flow'
import { MockFunction } from '@/services/Mocker'

export const randomFlow: MockFunction<Flow, [Partial<Flow>?]> = function(overrides = {}) {
  return new Flow({
    id: this.create('id'),
    created: this.create('date'),
    description: this.create('paragraph'),
    updated: this.create('date'),
    name: this.create('noun'),
    ...overrides,
  })
}
