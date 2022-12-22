import { WorkerPool } from '@/models'
import { MockFunction } from '@/services'

export const randomWorkerPool: MockFunction<WorkerPool, [Partial<WorkerPool>?]> = function(overrides = {}) {
  const name = this.create('noun')

  return new WorkerPool({
    // Setting the id to the name allows us to reference the worker pool by name
    // in the demo application key data stores without throwing errors.
    id: name,
    created: this.create('date'),
    updated: this.create('date'),
    name: name,
    description: this.create('paragraph'),
    type: this.create('noun'),
    isPaused: this.create('boolean'),
    concurrencyLimit: this.create('number'),
    defaultQueueId: this.create('id'),
    ...overrides,
  })
}