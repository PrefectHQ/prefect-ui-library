import { WorkQueue } from '@/models/WorkQueue'
import { WorkQueueFilter } from '@/models/WorkQueueFilter'
import { MockFunction } from '@/services/Mocker'

export const randomWorkQueue: MockFunction<WorkQueue, [Partial<WorkQueue>?]> = function(overrides = {}) {
  const { filter, ...rest } = overrides

  return new WorkQueue({
    id: this.create('string'),
    created: this.create('date'),
    updated: this.create('date'),
    name: this.create('string'),
    filter: this.create('workQueueFilter', [filter]),
    description: this.create('string'),
    isPaused: this.create('boolean'),
    concurrencyLimit: this.create('number'),
    ...rest,
  })
}

export const randomWorkQueueFilter: MockFunction<WorkQueueFilter, [Partial<WorkQueueFilter>?]> = function(overrides = {}) {
  return new WorkQueueFilter({
    tags: this.createMany('string', 3),
    deploymentIds: this.createMany('string', 3),
    flowRunnerTypes: this.createMany('flowRunnerType', 3),
    ...overrides,
  })
}