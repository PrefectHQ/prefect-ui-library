import { WorkerPoolWorker } from '@/models'
import { MockFunction } from '@/services'

export const randomWorker: MockFunction<WorkerPoolWorker, [Partial<WorkerPoolWorker>?]> = function(overrides = {}) {
  return new WorkerPoolWorker({
    id: this.create('id'),
    created: this.create('date'),
    updated: this.create('date'),
    workerPoolId: this.create('id'),
    name: this.create('noun'),
    lastHeartbeatTime: this.create('date'),
    ...overrides,
  })
}