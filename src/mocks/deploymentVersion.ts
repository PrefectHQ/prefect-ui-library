import { DeploymentVersion } from '@/models/DeploymentVersion'
import { MockFunction } from '@/services/Mocker'

export const randomDeploymentVersion: MockFunction<DeploymentVersion, [Partial<DeploymentVersion>?]> = function(overrides = {}) {
  return {
    id: this.create('id'),
    deploymentId: this.create('id'),
    kind: 'deployment-version',
    description: this.create('paragraph'),
    created: this.create('date'),
    createdBy: this.create('createdOrUpdatedBy'),
    updated: this.create('date'),
    updatedBy: this.create('createdOrUpdatedBy'),
    name: this.create('noun'),
    versionInfo: {
      type: 'vcs:github',
      version: this.create('string'),
      base: this.create('string'),
      branch: this.create('string'),
      url: this.create('url'),
    },
    tags: this.createMany('noun', this.create('number', [0, 5])),
    labels: {},
    entrypoint: this.create('id'),
    pullSteps: [],
    parameters: {},
    parameterOpenApiSchema: {},
    jobVariables: {},
    workQueueName: this.create('noun'),
    workPoolName: this.create('noun'),
    enforceParameterSchema: this.create('boolean'),
    ...overrides,
  }
}
