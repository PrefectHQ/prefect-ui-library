import { ArtifactResponse } from '@/models/api/ArtifactResponse'
import { Artifact } from '@/models/Artifact'
import { MapFunction } from '@/services/Mapper'
import { isKnownArtifactType, isSerializedArtifactData } from '@/types/artifact'
import { parseUnknownJson, stringifyUnknownJson } from '@/utilities/json'

export const mapArtifactResponseToArtifact: MapFunction<ArtifactResponse, Artifact> = function(source) {
  let { data } = source
  let serializedData

  if (isSerializedArtifactData(source.type, source.data)) {
    data = parseUnknownJson(source.data)
    serializedData = source.data
  } else {
    serializedData = stringifyUnknownJson(source.data)
  }

  return new Artifact({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    description: source.description,
    key: source.key,
    type: isKnownArtifactType(source.type) ? source.type : 'unknown',
    data,
    serializedData,
    metadata: source.metadata_,
    flowRunId: source.flow_run_id,
    taskRunId: source.task_run_id,
  })
}