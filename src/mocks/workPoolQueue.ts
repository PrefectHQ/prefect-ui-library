import { WorkPoolQueue } from '@/models'
import { MockFunction } from '@/services'

export const randomWorkPoolQueue: MockFunction<WorkPoolQueue, [Partial<WorkPoolQueue>?]> = function(overrides = {}) {
  return new WorkPoolQueue({
    id: this.create('id'),
    created: this.create('date'),
    updated: this.create('date'),
    workPoolId: this.create('id'),
    workPoolName: this.create('noun'),
    name: this.create('noun'),
    description: this.create('paragraph'),
    isPaused: this.create('boolean'),
    concurrencyLimit: this.create('number'),
    priority: this.create('number'),
    status: 'ready',
    ...overrides,
  })
}