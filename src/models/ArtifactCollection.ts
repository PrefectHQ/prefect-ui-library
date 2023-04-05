import { ArtifactData, ArtifactMetadata, ArtifactType, IArtifact } from '@/models/Artifact'

export interface IArtifactCollection extends IArtifact {
  latestId: string,
  key: string,
}

export class ArtifactCollection implements IArtifactCollection {
  public readonly id: string
  public readonly latestId: string
  public readonly key: string
  public readonly flowRunId: string | null
  public readonly taskRunId: string | null
  public readonly created: Date
  public readonly updated: Date
  public type: ArtifactType
  public description: string | null
  public data: ArtifactData
  public metadata: ArtifactMetadata

  public constructor(artifact: IArtifactCollection) {
    this.id = artifact.id
    this.latestId = artifact.latestId
    this.created = artifact.created
    this.updated = artifact.updated
    this.key = artifact.key
    this.type = artifact.type
    this.description = artifact.description
    this.data = artifact.data
    this.metadata = artifact.metadata
    this.flowRunId = artifact.flowRunId
    this.taskRunId = artifact.taskRunId
  }
}