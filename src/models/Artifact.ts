import { Icon } from '@prefecthq/prefect-design'

export const artifactTypes = [
  'result',
  'markdown',
  'table',
  'unknown',
] as const

export type ArtifactType = typeof artifactTypes[number]

export const artifactTypeIconMap = {
  default: 'FingerPrintIcon',
  markdown: 'DocumentTextIcon',
  table: 'TableCellsIcon',
  result: 'CalculatorIcon',
  unknown: 'FingerPrintIcon',
} as const satisfies Record<ArtifactType | 'default', Icon>

export type ResultArtifactData = Record<string, unknown>
export type MarkdownArtifactData = string
export type TableArtifactData = string
export type UnknownArtifactData = unknown

export type ArtifactData = ResultArtifactData | MarkdownArtifactData | TableArtifactData | UnknownArtifactData
export type ArtifactMetadata = Record<string, string>

export interface IArtifact {
  id: string,
  created: Date,
  updated: Date,
  key: string | null,
  type: ArtifactType,
  description: string | null,
  data: ArtifactData,
  metadata: ArtifactMetadata,
  flowRunId: string | null,
  taskRunId: string | null,
}

export type ResultArtifact = IArtifact & {
  type: 'result',
  data: ResultArtifactData,
}

export type MarkdownArtifact = IArtifact & {
  type: 'markdown',
  data: MarkdownArtifactData,
}

export type TableArtifact = IArtifact & {
  type: 'table',
  data: TableArtifactData,
}

export type UnknownArtifact = IArtifact & {
  type: 'unknown',
  data: unknown,
}

export class Artifact implements IArtifact {
  public readonly id: string
  public readonly key: string | null
  public readonly flowRunId: string | null
  public readonly taskRunId: string | null
  public readonly created: Date
  public readonly updated: Date
  public type: ArtifactType
  public description: string | null
  public data: ArtifactData
  public metadata: ArtifactMetadata

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