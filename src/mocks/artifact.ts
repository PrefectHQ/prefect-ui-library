import { Artifact, ArtifactType, artifactTypes } from '@/models'
import { MockFunction } from '@/services/Mocker'
import { choice } from '@/utilities'

export const randomArtifact: MockFunction<Artifact, [Partial<Artifact>?]> = function(overrides = {}) {
  const type = choice<ArtifactType>(artifactTypes)
  let data = null

  switch (type) {
    case 'result':
      data = {
        type: choice(['literal']),
        value: this.create('string'),
      }
      break
    case 'markdown':
      data = this.create('markdownString', [{ sections: 4 }])
      break
    case 'table':
      // TODO: Figure out table data type
      data = []
      break
    default:
      break
  }

  return new Artifact({
    id: this.create('string'),
    created: this.create('date'),
    updated: this.create('date'),
    key: choice([null, this.create('noun')]),
    type,
    description: this.create('markdownString', [{ sections: 1 }]),
    flowRunId: this.create('id'),
    taskRunId: this.create('id'),
    data,
    metadata: {},
    ...overrides,
  })
}