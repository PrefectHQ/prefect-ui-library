import { ArtifactResponse } from '@/models/api/ArtifactResponse'
import { Artifact } from '@/models/Artifact'
import { MapFunction } from '@/services/Mapper'

export const mapArtifactResponseToArtifact: MapFunction<ArtifactResponse, Artifact> = function(source) {
  return new Artifact({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    key: source.key,
    type: source.type,
    data: source.data,
    metadata: source.metadata_,
    flowRunId: source.flow_run_id,
    taskRunId: source.task_run_id,
  })
}