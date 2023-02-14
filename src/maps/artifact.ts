import { ArtifactResponse } from '@/models/api/ArtifactResponse'
import { Artifact } from '@/models/Artifact'
import { MapFunction } from '@/services/Mapper'

export const mapArtifactResponseToArtifact: MapFunction<ArtifactResponse, Artifact> = function(source) {
  return new Artifact({
    id: source.id,
    created: new Date(source.created),
    updated: new Date(source.updated),
    key: source.key,
    type: source.type,
    data: source.data,
    metadata: source.metadata_,
    flowRunId: source.flow_run_id,
    taskRunId: source.task_run_id,
  })
}