import { WorkPoolQueue } from '@/models'
import { MockFunction } from '@/services/Mocker'

export const randomWorkQueue: MockFunction<WorkPoolQueue, [Partial<WorkPoolQueue>?]> = function(overrides = {}) {
  return new WorkPoolQueue({
    id: this.create('id'),
    created: this.create('date'),
    updated: this.create('date'),
    name: this.create('noun'),
    description: this.create('paragraph'),
    isPaused: this.create('boolean'),
    concurrencyLimit: this.create('number'),
    priority: this.create('number'),
    workPoolId: this.create('id'),
    lastPolled: null,
    status: 'not_ready',
    ...overrides,
  })
}
