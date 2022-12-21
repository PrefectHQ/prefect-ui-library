import { WorkerPoolQueue } from '@/models'
import { MockFunction } from '@/services'

export const randomWorkerPoolQueue: MockFunction<WorkerPoolQueue, [Partial<WorkerPoolQueue>?]> = function(overrides = {}) {
  return new WorkerPoolQueue({
    id: this.create('id'),
    created: this.create('date'),
    updated: this.create('date'),
    workerPoolId: this.create('id'),
    name: this.create('noun'),
    description: this.create('paragraph'),
    isPaused: this.create('boolean'),
    concurrencyLimit: this.create('number'),
    priority: this.create('number'),
    ...overrides,
  })
}