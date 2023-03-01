export type ArtifactData = Record<string, unknown>

export interface IArtifact {
  id: string,
  created: Date,
  updated: Date,
  key: string | null,
  type: string,
  description: string | null,
  data: ArtifactData,
  metadata: ArtifactData,
  flowRunId: string | null,
  taskRunId: string | null,
}

export class Artifact implements IArtifact {
  public readonly id: string
  public readonly key: string | null
  public readonly flowRunId: string | null
  public readonly taskRunId: string | null
  public readonly created: Date
  public readonly updated: Date
  public type: string
  public description: string | null
  public data: ArtifactData
  public metadata: ArtifactData

  public constructor(artifact: IArtifact) {
    this.id = artifact.id
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