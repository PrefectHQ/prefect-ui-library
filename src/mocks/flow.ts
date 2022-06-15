import { Flow } from '@/models/Flow'
import { MockFunction } from '@/services/Mocker'

export const randomFlow: MockFunction<Flow> = function(overrides: Partial<Flow> = {}) {
  return new Flow({
    id: this.create('string'),
    created: this.create('date'),
    updated: this.create('date'),
    name: this.create('string'),
    tags: this.createMany('string', 3),
    ...overrides,
  })
}