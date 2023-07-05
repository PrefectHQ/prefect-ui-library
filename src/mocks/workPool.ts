import { WorkPool } from '@/models'
import { MockFunction } from '@/services'

export const randomWorkPool: MockFunction<WorkPool, [Partial<WorkPool>?]> = function(overrides = {}) {
  const name = this.create('noun')

  return new WorkPool({
    // Setting the id to the name allows us to reference the work pool by name
    // in the demo application key data stores without throwing errors.
    id: name,
    created: this.create('date'),
    updated: this.create('date'),
    name: name,
    description: this.create('paragraph'),
    type: this.create('noun'),
    isPaused: this.create('boolean'),
    isPushPool: this.create('boolean'),
    concurrencyLimit: this.create('number'),
    defaultQueueId: this.create('id'),
    baseJobTemplate: this.create('parameters', [{}, this.create('schema')]),
    ...overrides,
  })
}