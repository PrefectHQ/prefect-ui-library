import { Artifact, ArtifactType } from '@/models'
import { MockFunction } from '@/services/Mocker'
import { choice } from '@/utilities'

export const randomArtifact: MockFunction<Artifact, [Partial<Artifact>?]> = function(overrides = {}) {
  const type = choice<ArtifactType>([ArtifactType.Markdown, ArtifactType.Result, ArtifactType.Table])
  let data = null

  switch (type) {
    case ArtifactType.Result:
      data = {
        type: choice(['literal']),
        value: this.create('string'),
      }
      break
    case ArtifactType.Markdown:
      data = this.create('markdownString', [{ sections: 4 }])
      break
    case ArtifactType.Table:
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