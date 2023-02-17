export type ArtifactData = Record<string, unknown>
export type ArtifactMetadata = {
  description: string,
}

export interface IArtifact {
  id: string,
  created: Date,
  updated: Date,
  key: string,
  type: string,
  data: ArtifactData,
  metadata: ArtifactMetadata,
  flowRunId: string | null,
  taskRunId: string | null,
}

export class Artifact implements IArtifact {
  public readonly id: string
  public readonly flowRunId: string | null
  public readonly taskRunId: string | null
  public readonly created: Date
  public readonly updated: Date
  public key: string
  public type: string
  public data: ArtifactData
  public metadata: ArtifactMetadata

  public constructor(artifact: IArtifact) {
    this.id = artifact.id
    this.created = artifact.created
    this.updated = artifact.updated
    this.key = artifact.key
    this.type = artifact.type
    this.data = artifact.data
    this.metadata = artifact.metadata
    this.flowRunId = artifact.flowRunId
    this.taskRunId = artifact.taskRunId
  }
}