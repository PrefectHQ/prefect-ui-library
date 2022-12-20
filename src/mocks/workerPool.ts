import { WorkerPool } from '@/models'
import { MockFunction } from '@/services'

export const randomWorkerPool: MockFunction<WorkerPool, [Partial<WorkerPool>?]> = function(overrides = {}) {
  return new WorkerPool({
    id: this.create('id'),
    created: this.create('date'),
    updated: this.create('date'),
    name: this.create('noun'),
    description: this.create('paragraph'),
    type: this.create('noun'),
    isPaused: this.create('boolean'),
    concurrencyLimit: this.create('number'),
    defaultQueueId: this.create('id'),
    ...overrides,
  })
}