import { Artifact } from '@/models'
import { MockFunction } from '@/services/Mocker'

export const randomArtifact: MockFunction<Artifact, [Partial<Artifact>?]> = function(overrides = {}) {
  return new Artifact({
    id: this.create('string'),
    created: this.create('date'),
    updated: this.create('date'),
    key: this.create('noun'),
    type: this.create('string'),
    flowRunId: this.create('id'),
    taskRunId: this.create('id'),
    data: { [this.create('noun')]: this.create('string') },
    metadata: { [this.create('noun')]: this.create('string') },
    ...overrides,
  })
}