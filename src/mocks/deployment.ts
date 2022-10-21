import { Deployment } from '@/models/Deployment'
import { MockFunction } from '@/services/Mocker'
import { random } from '@/utilities/math'

export const randomDeployment: MockFunction<Deployment, [Partial<Deployment>?]> = function(overrides = {}) {
  const schema = this.create('schema')

  return {
    id: this.create('id'),
    created: this.create('date'),
    createdBy: this.create('createdBy'),
    updated: this.create('date'),
    updatedBy: this.create('updatedBy'),
    name: this.create('noun'),
    version: this.create('string'),
    description: this.create('paragraph'),
    flowId: this.create('id'),
    schedule: random() > 0.25 ? this.create('schedule') : null,
    isScheduleActive: this.create('boolean'),
    parameters: this.create('parameters', [{}, schema]),
    parameterOpenApiSchema: schema,
    tags: this.createMany('noun', this.create('number', [0, 5])),
    manifestPath: this.create('id'),
    path: this.create('id'),
    entrypoint: this.create('id'),
    storageDocumentId: this.create('id'),
    infrastructureDocumentId: this.create('id'),
    deprecated: false,
    workQueueName: random() > 0.05 ? this.create('noun') : null,
    ...overrides,
  }
}
