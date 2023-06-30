import { BaseJobTemplate, WorkPool } from '@/models'
import { MockFunction, mapper } from '@/services'

export const randomWorkPool: MockFunction<WorkPool, [Partial<WorkPool>?]> = function(overrides = {}) {
  const name = this.create('noun')
  const schema = this.create('schema')
  const jobConfiguration = this.create('parameters', [{}, schema])
  const parameters = mapper.map('SchemaValuesResponse', { values: jobConfiguration, schema }, 'SchemaValues')

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
    concurrencyLimit: this.create('number'),
    defaultQueueId: this.create('id'),
    baseJobTemplate: new BaseJobTemplate({
      jobConfiguration: parameters,
      variables: schema,
    }),
    ...overrides,
  })
}