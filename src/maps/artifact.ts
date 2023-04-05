import { ArtifactCollectionResponse } from '@/models/api/ArtifactCollectionResponse'
import { ArtifactResponse } from '@/models/api/ArtifactResponse'
import { Artifact } from '@/models/Artifact'
import { ArtifactCollection } from '@/models/ArtifactCollection'
import { MapFunction } from '@/services/Mapper'
import { isKnownArtifactType } from '@/types/artifact'

export const mapArtifactResponseToArtifact: MapFunction<ArtifactResponse, Artifact> = function(source) {
  return new Artifact({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    description: source.description,
    key: source.key,
    type: isKnownArtifactType(source.type) ? source.type : 'unknown',
    data: source.data,
    metadata: source.metadata_,
    flowRunId: source.flow_run_id,
    taskRunId: source.task_run_id,
  })
}

export const mapArtifactCollectionResponseToArtifactCollection: MapFunction<ArtifactCollectionResponse, ArtifactCollection> = function(source) {
  return new ArtifactCollection({
    id: source.id,
    latestId: source.latest_id,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    description: source.description,
    key: source.key,
    type: isKnownArtifactType(source.type) ? source.type : 'unknown',
    data: source.data,
    metadata: source.metadata_,
    flowRunId: source.flow_run_id,
    taskRunId: source.task_run_id,
  })
}