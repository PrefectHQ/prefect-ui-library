import { WorkQueue } from '@/models/WorkQueue'
import { WorkQueueFilter } from '@/models/WorkQueueFilter'
import { MockFunction } from '@/services/Mocker'

export const randomWorkQueue: MockFunction<WorkQueue, [Partial<WorkQueue>?]> = function(overrides = {}) {
  const { filter, ...rest } = overrides

  return new WorkQueue({
    id: this.create('id'),
    created: this.create('date'),
    updated: this.create('date'),
    name: this.create('noun'),
    filter: this.create('workQueueFilter', [filter]),
    description: this.create('paragraph'),
    isPaused: this.create('boolean'),
    concurrencyLimit: this.create('number'),
    priority: this.create('number'),
    workPoolId: this.create('id'),
    status: 'not_ready',
    ...rest,
  })
}

export const randomWorkQueueFilter: MockFunction<WorkQueueFilter, [Partial<WorkQueueFilter>?]> = function(overrides = {}) {
  return new WorkQueueFilter({
    tags: this.createMany('noun', this.create('number', [0, 4])),
    deploymentIds: this.createMany('id', 3),
    ...overrides,
  })
}