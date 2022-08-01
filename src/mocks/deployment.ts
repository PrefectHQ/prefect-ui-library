import { Deployment } from '@/models/Deployment'
import { MockFunction } from '@/services/Mocker'
import { random } from '@/utilities/math'

export const randomDeployment: MockFunction<Deployment, [Partial<Deployment>?]> = function(overrides = {}) {
  return {
    id: this.create('id'),
    created: this.create('date'),
    updated: this.create('date'),
    name: this.create('noun'),
    description: this.create('paragraph'),
    flowId: this.create('id'),
    schedule: random() > 0.25 ? this.create('schedule') : null,
    isScheduleActive: this.create('boolean'),
    parameters: this.create('parameters'),
    parameterOpenApiSchema: this.create('openApiSchema'),
    tags: this.createMany('string', 3),
    manifestPath: this.create('id'),
    storageDocumentId: this.create('id'),
    infrastructureDocumentId: this.create('id'),
    deprecated: false,
    ...overrides,
  }
}