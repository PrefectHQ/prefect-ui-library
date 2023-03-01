import { ArtifactType, ResultArtifact, ResultArtifactData, MarkdownArtifact, MarkdownArtifactData, UnknownArtifact, Artifact, ArtifactData, TableArtifact, TableArtifactData } from '@/models/Artifact'

export function isResultArtifact(artifact: Artifact): artifact is ResultArtifact {
  return artifact.type === ArtifactType.Result
}

export function isMarkdownArtifact(artifact: Artifact): artifact is MarkdownArtifact {
  return artifact.type === ArtifactType.Markdown
}

export function isTableArtifact(artifact: Artifact): artifact is TableArtifact {
  return artifact.type === ArtifactType.Table
}

export function isKnownArtifactType(type: string): type is ArtifactType {
  return Object.values(ArtifactType).includes(type as ArtifactType)
}

export function isUnknownArtifact(artifact: Artifact): artifact is UnknownArtifact {
  return artifact.type === ArtifactType.Unknown
}

export function isResultArtifactData(data: ArtifactData): data is ResultArtifactData {
  return typeof data === 'object'
}

export function isMarkdownArtifactData(data: ArtifactData): data is MarkdownArtifactData {
  return typeof data === 'string'
}

export function isTableArtifactData(data: ArtifactData): data is TableArtifactData {
  return Array.isArray(data)
}
