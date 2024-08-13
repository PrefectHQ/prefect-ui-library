import { createObjectLevelCan } from '@/models'
import { Deployment } from '@/models/Deployment'
import { MockFunction } from '@/services/Mocker'
import { random } from '@/utilities/math'

export const randomDeployment: MockFunction<Deployment, [Partial<Deployment>?]> = function(overrides = {}) {
  const paused = random() > 0.25
  const schedule = random() > 0.25 ? this.create('schedule') : null
  const disabled = random() > 0.25

  return {
    id: this.create('id'),
    created: this.create('date'),
    createdBy: this.create('createdOrUpdatedBy'),
    updated: this.create('date'),
    updatedBy: this.create('createdOrUpdatedBy'),
    name: this.create('noun'),
    version: this.create('string'),
    description: this.create('paragraph'),
    flowId: this.create('id'),
    schedule,
    schedules: this.create('deploymentSchedules'),
    paused: paused,
    parameters: {},
    parameterOpenApiSchema: {},
    tags: this.createMany('noun', this.create('number', [0, 5])),
    manifestPath: this.create('id'),
    path: this.create('id'),
    entrypoint: this.create('id'),
    storageDocumentId: this.create('id'),
    infrastructureDocumentId: this.create('id'),
    jobVariables: {},
    deprecated: false,
    workQueueName: null,
    workPoolName: random() > 0.05 ? this.create('noun') : null,
    appliedBy: random() > 0.05 ? this.create('noun') : null,
    enforceParameterSchema: this.create('boolean'),
    pullSteps: [],
    can: createObjectLevelCan(),
    status: this.create('deploymentStatus'),
    disabled: disabled,
    ...overrides,
  }
}
